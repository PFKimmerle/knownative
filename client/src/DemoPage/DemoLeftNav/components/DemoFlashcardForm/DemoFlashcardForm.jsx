import { useState } from 'react';
import './DemoFlashcardForm.scss';
import DemoFlashcardGameModal from '../DemoFlashcardGameModal/DemoFlashcardGameModal';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  FormLabel
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function DemoFlashcardForm({ localSavedWords, handleBackArrowClick, blurText }) {
  const [selectedFront, setSelectedFront] = useState('chinese');
  const [showPinyin, setShowPinyin] = useState(true);

  // checking if there's saved words to enable/disable quiz
  const hasSavedWords = localSavedWords && localSavedWords.length > 0;

  return (
    <>
      <div className="flashcard-form">
        <header className="flashcard-form__header">
          <h3>Learn</h3>
          <div>
            <ChevronLeftIcon
              fontSize="large"
              className="flashcard-form__arrow-back"
              data-tooltip-id="flashcards-tooltip"
              onClick={handleBackArrowClick}
            />
          </div>
        </header>
        {hasSavedWords ? (
          <>
            <FormGroup>
              <FormLabel
                id="radio-buttons-group-label"
                className="form-group__label"
                sx={{ color: 'black' }}>
                <p>Review your saved terms with a short quiz.</p>
                <p>Choose which to display on the front:</p>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  column
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="form-group__radio-buttons">
                  <FormControlLabel
                    value="chinese"
                    control={
                      <Radio
                        sx={{
                          paddingTop: '0px',
                          paddingBottom: '0px',
                          '&.Mui-checked': {
                            color: '#00b9bc'
                          }
                        }}
                      />
                    }
                    label="Chinese"
                    checked={selectedFront === 'chinese'}
                    onChange={() => setSelectedFront('chinese')}
                  />
                  <FormControlLabel
                    value="english"
                    control={
                      <Radio
                        sx={{
                          paddingTop: '0px',
                          paddingBottom: '0px',
                          '&.Mui-checked': {
                            color: '#00b9bc'
                          }
                        }}
                      />
                    }
                    label="English"
                    checked={selectedFront === 'english'}
                    onChange={() => setSelectedFront('english')}
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPinyin}
                    onChange={() => setShowPinyin(!showPinyin)}
                    sx={{
                      color: 'black',
                      '&.Mui-checked': {
                        color: '#00b9bc'
                      }
                    }}
                  />
                }
                label="Show pinyin"
                className="form-group__checkbox--show-pinyin"
              />
            </FormGroup>
          </>
        ) : (
          <>
            <div className="flashcard-form__quiz-subtext">
              <p>No words have been saved yet!</p>
              <p>
                Get started by navigating to the Study tab and selecting some words you&apos;d like
                to study.
              </p>
            </div>
          </>
        )}
        <DemoFlashcardGameModal
          wordList={localSavedWords}
          selectedFront={selectedFront}
          showPinyin={showPinyin}
          blurText={blurText}
        />
      </div>
    </>
  );
}
