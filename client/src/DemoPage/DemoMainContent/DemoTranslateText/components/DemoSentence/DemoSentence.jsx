import './DemoSentence.scss';
import * as demoAPI from '../../../../../utilities/demo-api';
import { useState, useEffect } from 'react';
import DemoTranslation from '../DemoTranslation/DemoTranslation';

export default function DemoSentence({ sentence, isFirst }) {
  const [translation, setTranslation] = useState('');
  const [showTranslation, setShowTranslation] = useState(isFirst || false);

  useEffect(() => {
    const fetchTranslation = async () => {
      const translatedSentence = await demoAPI.translateSentence(sentence);
      setTranslation(translatedSentence);
    };

    fetchTranslation();
  }, [sentence]);

  const handleTranslate = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <>
      <div className="sentence">
        {/* Google Icons translate Icon */}
        <button
          className={`material-symbols-outlined sentence__toggle-translation ${
            showTranslation ? 'translation-visible' : ''
          }`}
          onClick={() => handleTranslate(sentence)}>
          &#xe8e2;
        </button>
        <span className="sentence__characters zh">{sentence}</span>
      </div>
      {translation && <DemoTranslation translation={translation} show={showTranslation} />}
    </>
  );
}
