import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { BiLinkExternal } from 'react-icons/bi';
import './TextPage.scss';

import StudyText from './features/TextStudy/StudyText';
import ReadText from './features/TextReader/ReadText';
import TranslateText from './features/TextTranslate/TranslateText';

import LeftNav from './features/LeftNav/LeftNav';
import SavedWordsList from './features/SavedWordsList/SavedWordsList';
import FlashcardForm from './features/Flashcards/FlashcardForm';
import InfoSidebar from './features/InfoSidebar/InfoSidebar';
import Library from './features/Library/Library';

import WelcomeModal from './features/Modals/WelcomeModal/WelcomeModal';
import ExitModal from './features/Modals/ExitModal/ExitModal';
// import * as wordsAPI from "../../../utilities/words-api";
import { getWordInfo } from '../utilities/words-service';
//import word from '../../../../models/word'
import { saveWord as saveCard, getText } from '../utilities/texts-api';
import DifficultyTag from './components/DifficultyTag/DifficultyTag';
import demoTexts from './data/demodata';

export default function TextPage() {
  // --- DISPLAY STATE VALUES ---
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('read');
  const [sidebarCategory, setSidebarCategory] = useState(null);
  const [expandedSidebar, setExpandedSidebar] = useState(false);
  

  //-- TEXT DIFFICULTY STATE VALUES--
  const [textSelection, setTextSelection] = useState(
    localStorage.getItem('textSelection') === null
      ? 'beginner'
      : localStorage.getItem('textSelection')
  );
  const [text, setText] = useState(state?.text ?? demoTexts.beginner);

  // --- SAVED WORDS ---
  const [localSavedWords, setLocalSavedWords] = useState(
    JSON.parse(localStorage.getItem('stringifiedWords') === null)
      ? []
      : JSON.parse(localStorage.getItem('stringifiedWords'))
  );
  // const [savedWords, setSavedWords] = useState([]);

  // --- STUDY TAB STATE ---
  const [activeWord, setActiveWord] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // --- EXIT MODAL ---
  const [showExitModal, setShowExitModal] = useState(false);
  const handleShowExit = () => setShowExitModal(true);

  // --- WELCOME MODAL ---
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(true);
  //const [WelcomeModalData, setWelcomeModalData] = useState(null);
  const [welcomeModalComplete, setWelcomeModalComplete] = useState(
    localStorage.getItem('welcomeModalComplete') === null
      ? false
      : JSON.parse(localStorage.getItem('welcomeModalComplete'))
  );

  const handleCloseWelcomeModal = () => {
    setWelcomeModalComplete(true);
    setWelcomeModalOpen(false);
    localStorage.setItem('welcomeModalComplete', 'true');
  };

  const handleWelcomeModalSubmit = () => {
    //setWelcomeModalData(data);
    handleCloseWelcomeModal();
  };

  // --- REFS ---
  const topRef = useRef(null);
  const blurRef = useRef(null);

  /*
  // --- Text Selection Side Effects---
  useEffect(() => {
    setText(demoTexts[textSelection]);
    localStorage.setItem('text', JSON.stringify(demoTexts[textSelection]));

    localStorage.setItem('textSelection', textSelection);
  }, [textSelection]);
  */

  useEffect(
    function () {
      function setLocalStorage() {
        localStorage.setItem('stringifiedWords', JSON.stringify(localSavedWords));
      }
      setLocalStorage();
    },
    [localSavedWords]
  );


  // --- SAVED WORDS RELATED FUNCTIONS ---
  function generateID() {
    const savedWords = JSON.parse(localStorage.getItem('stringifiedWords'));
    if (savedWords.length === 0) {
      return 0;
    } else {
      return savedWords[savedWords.length - 1]._id + 1;
    }
  }

  async function saveWord(word) {
    const savedWords = JSON.parse(localStorage.getItem('stringifiedWords')) || [];
    const wordToSave = getWordInfo(word);
    wordToSave._id = generateID();
  
    // --- Save the word to the server (Database) ---
    try {
      await saveCard(wordToSave, text._id);
      const updatedText = await getText(text._id);
    } catch (err) {
      console.error('Failed to save or refresh:', err);
    }
  
    // --- Save the word locally in browser ---
    setLocalSavedWords([...savedWords, wordToSave]);
    setActiveWord('');
    setShowPopup(false);
  }
  
  function deleteWord(word) {
    const savedWords = JSON.parse(localStorage.getItem('stringifiedWords'));
    const filteredWords = savedWords.filter((item) => item._id !== word._id);
    setLocalSavedWords([...filteredWords]);
  }

  /* FUNCTION ALTERED to allow for users to have meaning, term, and reading updated after form submission.*/
  function updateWord(word, inputtedMeaning, inputtedTerm, inputtedReading) {
    const savedWords = JSON.parse(localStorage.getItem('stringifiedWords'));
    for (let k in savedWords) {
      if (savedWords[k]._id === word._id) {
        savedWords[k].meaning = inputtedMeaning;
        savedWords[k].charGroup = inputtedTerm;
        savedWords[k].pinyin = inputtedReading;
      }
    }
    setLocalSavedWords([...savedWords]);
  }

  // --- DISPLAY RELATED FUNCTIONS ---
  function handleTabClick(tabName) {
    topRef.current?.scroll(0, 0);
    setActiveTab(tabName);
  }

  //this function will change the type of content that should be displayed on the sidebar whenever one of the nav buttons is clicked
  function changeSidebarCategory(selectedIcon) {
    if (sidebarCategory === selectedIcon) {
      setSidebarCategory(null);
    } else {
      setSidebarCategory(selectedIcon);
    }
  }

  //function that physically expands the sidebar
  function expandSidebar() {
    setExpandedSidebar(!expandedSidebar);
  }

  //function that closes the sidebar when you click on the arrow icon.
  function handleBackArrowClick(e) {
    const toolTipId = e.currentTarget.dataset.tooltipId;
    expandSidebar();
    changeSidebarCategory(toolTipId);
  }

  // blurs background text when flashcard game in progress
  const blurText = (isActive) => {
    if (isActive) {
      blurRef.current.style.filter = 'blur(4px)';
    } else {
      blurRef.current.removeAttribute('style');
    }
  };

  return !text ? (
    'Loading ...'
  ) : (
    <main className={`TextPage page ${expandedSidebar ? 'expanded-sidebar' : 'collapsed-sidebar'}`}>
      <nav className="side-nav">
        <LeftNav
          expandSidebar={expandSidebar}
          changeSidebarCategory={changeSidebarCategory}
          sidebarCategory={sidebarCategory}
          savedWords={localSavedWords}
          handleShowExit={handleShowExit}
        />
      </nav>

      {/* Conditional rendering, dependent on the values of expandedSidbar and sidebarCategory, that will determine if the sidebar is displayed and what content is displayed. */}
      {/* Potential Option for refactor and moving sidebar components into either DemoLeftNav or a separate component under DemoLeftNav  */}
      <aside className="sidebar">
        {sidebarCategory === 'savedwords-tooltip' && (
          <SavedWordsList
            savedWords={localSavedWords}
            updateWord={updateWord}
            deleteWord={deleteWord}
            handleBackArrowClick={handleBackArrowClick}
          />
        )}
        {sidebarCategory === 'flashcards-tooltip' && (
          <FlashcardForm
            expandSidebar={expandSidebar}
            changeSidebarCategory={changeSidebarCategory}
            localSavedWords={localSavedWords}
            handleBackArrowClick={handleBackArrowClick}
            blurText={blurText}
          />
        )}
        {sidebarCategory === 'info-tooltip' && (
          <InfoSidebar
            changeSidebarCategory={changeSidebarCategory}
            handleBackArrowClick={handleBackArrowClick}
          />
        )}
        {sidebarCategory === 'library-tooltip' && (
          <Library
            handleBackArrowClick={handleBackArrowClick}
            textSelection={textSelection}
            setTextSelection={setTextSelection}
            setLocalSavedWords={setLocalSavedWords}
            demoTexts={demoTexts}
          />
        )}
      </aside>

      <section className="main-area" ref={topRef}>
        {/* Potential to be separate component: ArticleHeader */}
        <div className="tabs sticky-fade">
          <button
            className={`tabs__btn ${activeTab === 'read' ? 'tabs__btn--active' : ''}`}
            onClick={() => handleTabClick('read')}>
            Read
          </button>
          <button
            className={`tabs__btn ${activeTab === 'study' ? 'tabs__btn--active' : ''}`}
            onClick={() => handleTabClick('study')}>
            Study
          </button>
          <button
            className={`tabs__btn ${activeTab === 'translate' ? 'tabs__btn--active' : ''}`}
            onClick={() => handleTabClick('translate')}>
            Translate
          </button>
        </div>

        <div className="text-area" ref={blurRef}>
          <div className="text-area__heading">
            <div className="flex-row">
              <h1 className="text-area__heading--title zh">{text.title}</h1>
              <article className="text-area__difficulty-tag">
                <DifficultyTag textSelection={textSelection} />
                <a href={text.source} className="text-area__view-source-link" target="_blank" rel="noreferrer">
                  View Source <BiLinkExternal />
                </a>
              </article>
            </div>
          </div>

          <div id="study" className={`study-container ${activeTab === 'study' ? 'study-container--active' : ''}`}>
            <div className="Text study-container__content">
              {text ? (
                <StudyText
                  text={text}
                  textId={text._id}
                  activeWord={activeWord}
                  setActiveWord={setActiveWord}
                  saveWord={saveWord}
                  savedWords={localSavedWords}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                />
              ) : (
                'Loading text'
              )}
            </div>
          </div>

          <div id="read" className={`read-container ${activeTab === 'read' ? 'read-container--active' : ''}`}>
            <div className="Text">{text ? <ReadText text={text} /> : 'Loading text'}</div>
          </div>

          <div
            id="translate"
            className={`translate-container ${activeTab === 'translate' ? 'translate-container--active' : ''}`}>
            <div className="Text">{text ? <TranslateText text={text} /> : 'Loading text'}</div>
          </div>
        </div>
      </section>
      <div id="exit-modal">
        {showExitModal ? <ExitModal setShowModal={setShowExitModal} /> : null}
      </div>

      {!welcomeModalComplete && (
        <WelcomeModal
          isOpen={isWelcomeModalOpen}
          onSubmit={handleWelcomeModalSubmit}
          onClose={handleCloseWelcomeModal}
          textSelection={textSelection}
          setTextSelection={setTextSelection}
        />
      )}
    </main>
  );
}

//--- OLD CODE ---

// async function favoriteText(text, textId) {
//   const updatedText = await textsAPI.favoriteText(text, textId);
//   updateText(updatedText);
// }

// async function saveWord(word, textId) {
//   const savedWord = await textsAPI.saveWord(word, textId)
//   setSavedWords([...savedWords, savedWord])
//   setActiveWord('')
//   setShowPopup(false)
// }

// async function updateMeaning(word, formData) {
//   const updatedWord = await wordsAPI.updateMeaning(word, formData)
//   setSavedWords(prevSavedWords =>
//     prevSavedWords.map(savedWord =>
//       savedWord._id === updatedWord._id ? updatedWord : savedWord))
// }

// async function deleteWord(word) {
//   setSavedWords(prevSavedWords =>
//     prevSavedWords.filter(savedWord => savedWord._id !== word._id))
//     try {
//       await wordsAPI.deleteWord(word)
//     } catch (error) {
//       console.error(error)
//     }
// }
