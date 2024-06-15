import StoryBuilder from './components/StoryBuilder.js';

const App = ({children}: any) => {
  return (
    <StoryBuilder>{children}</StoryBuilder>
  )
}

export default App;