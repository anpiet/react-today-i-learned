type HeaderProps = {
    showForm: boolean,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Header = ({ showForm, setShowForm }:  HeaderProps) => {
    const appTitle = 'Today I Learned';
  
    return (
      <header className='header'>
        <div className='logo'>
        <img src='./react-today-i-learned/logo.png' height='68' width='68' alt='Today I Learned Logo' />

          <h1>{appTitle}</h1>
        </div>
  
        <button
          className='btn btn-large btn-open'
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? 'Close' : 'Share a fact'}
        </button>
      </header>
    );
  }