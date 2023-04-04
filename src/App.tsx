import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Template from './components/Template';
import Home from './pages/Home';
import Single from './pages/Single';
import Categories from './pages/Categories';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql', 
  //uri: 'https://strapi-119331-0.cloudclusters.net/', //need to install graph ql on command line
// https://www.youtube.com/watch?v=oMS26wLsrqc - video for importing the data
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template/>} > {/* wrap pages in the template */}
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<Single/>}/>
          <Route path="/categories/:id" element={<Categories/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App;