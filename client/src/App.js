// Dependencies
import { React, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// Styling & Animation
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import './index.css';

// Components
import Header from './components/Header';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Start from './pages/Start';
import Seattle from './pages/Seattle';
import SeattleExploreHunt from './pages/SeattleExploreHunt';
import SeattleIndulgeHunt from './pages/SeattleIndulgeHunt';
import SeattleCustomHunt from './pages/SeattleCustomHunt';
import Spokane from './pages/Spokane';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About'
import HuntItem from './pages/HuntItem'

//admin pages
import Admin from './pages/Admin/Dashboard'
import HuntItemAdmin from './pages/Admin/HuntItem'
import HuntsAdmin from './pages/Admin/Hunts';
import HuntsViewAdmin from './pages/Admin/HuntsView';
import HuntsEditAdmin from './pages/Admin/HuntsEdit';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (

    <AnimatePresence exitBeforeEnter>
      <ApolloProvider client={client}>
        <Router >
          <div id="root" className="app-container">
            <Header />

            <div className="content-wrapper">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/start" element={<Start />} />
                <Route path="/seattle" element={<Seattle />} />
                <Route path="/spokane" element={<Spokane />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                {/* hunt and hunt id routes Seattle*/}
                <Route path="/seattle/explore" element={<SeattleExploreHunt />} />
                <Route path="/seattle/indulge" element={<SeattleIndulgeHunt />} />
                <Route path="/seattle/custom" element={<SeattleCustomHunt />} />

                {/* hunt item and hunt routes */}
                <Route path="/victory/:huntItemId"  />
                <Route path="/hints/:huntItemId" element={<HuntItem />} />

                <Route path="/hunt/:huntId" />
               
                {/* organizer routes */}
                <Route path="/hunt/create" />

                {/* admin -- probably a pipe dream :D */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/hunts" element={<HuntsAdmin />} />
                <Route path="/admin/hunts/view/:huntId" element={<HuntsViewAdmin />} />
                <Route path="/admin/hunts/edit/:huntId" element={<HuntsEditAdmin />} />
                <Route path="/admin/:huntItemId" element={<HuntItemAdmin />} />
                <Route path="/admin/:huntId" />
                <Route path="/admin/huntitem/update/:huntItemId"  />
                <Route path="/admin/huntitem/create/:huntItemId" />
                <Route path="/admin/hunt/update/:huntId" />
                <Route path="/admin/hunt/create/:huntId" />

              </Routes>

            </div>

            <Footer />
          </div>
        </Router>
      </ApolloProvider>

    </AnimatePresence>

  )
}

export default App