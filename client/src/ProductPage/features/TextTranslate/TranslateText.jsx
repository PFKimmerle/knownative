import './TranslateText.scss';
import { splitSentences } from '../../../utilities/texts-service';
import Sentence from './components/Sentence.jsx';

export default function TranslateText({ text }) {
  const sentenceArray = splitSentences(text.content);
  const sentences = sentenceArray.map((sentence, idx) => (
    <Sentence key={idx} sentence={sentence} isFirst={idx === 0} />
  ));

  return (
    <div className="translate-text">
      <div className="translate-text__block">{sentences}</div>
    </div>
  );
}
