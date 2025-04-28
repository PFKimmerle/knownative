import './Sentence.scss';
import * as demoAPI from '../../../../utilities/demo-api'; // needs to be updated product API
import { useState, useEffect } from 'react';
import Translation from './Translation';

export default function Sentence({ sentence, isFirst }) {
  const [translation, setTranslation] = useState('');
  const [showTranslation, setShowTranslation] = useState(isFirst || false);

  useEffect(() => {
    const fetchTranslation = async () => {
      const translatedSentence = await demoAPI.translateSentence(sentence); // needs to be updated product API
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
      {translation && <Translation translation={translation} show={showTranslation} />}
    </>
  );
}
