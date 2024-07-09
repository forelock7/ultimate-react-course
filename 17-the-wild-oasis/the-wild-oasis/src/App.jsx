import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wiled Oasis</Heading>

        <Heading as="h2">Check in and out</Heading>
        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Check out')}>Check out</Button>

        <Heading as="h3">Form</Heading>
        <Input type="number" placeholder="Number of guests" />
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
};

export default App;
