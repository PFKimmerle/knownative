import './Translation.scss'

export default function Translation({ translation, show }) {
  return (
    <p className={`sentence-translation zh ${show ? 'show-container' : ''}`}>{ translation }</p>
  )
}