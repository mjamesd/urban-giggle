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
import { 
    // motion, AnimateSharedLayout, 
    AnimatePresence } from "framer-motion";
import './index.css';

// Components
import Header from './components/Header';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Start from './pages/Start';
import SeattleExploreHunt from './pages/SeattleExploreHunt';
import Custom from './pages/Custom';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About'
import HuntItem from './pages/HuntItem'
import Hunt from './pages/Hunt.js'
import Hunts from './pages/Hunts.js'

//admin pages
import Admin from './pages/Admin/Dashboard'
import HuntsIndexAdmin from './pages/Admin/HuntsIndex';
import HuntsAddAdmin from './pages/Admin/HuntsAdd';
import HuntsViewAdmin from './pages/Admin/HuntsView';
import HuntsEditAdmin from './pages/Admin/HuntsEdit';
import HuntItemsIndexAdmin from './pages/Admin/HuntItemsIndex';
import HuntItemsAddAdmin from './pages/Admin/HuntItemsAdd';
import HuntItemsViewAdmin from './pages/Admin/HuntItemsView';
import HuntItemsEditAdmin from './pages/Admin/HuntItemsEdit';
import BadgesIndexAdmin from './pages/Admin/BadgesIndex';
import BadgesAddAdmin from './pages/Admin/BadgesAdd';
import BadgesViewAdmin from './pages/Admin/BadgesView';
import BadgesEditAdmin from './pages/Admin/BadgesEdit';
import UsersIndexAdmin from './pages/Admin/UsersIndex';
import UsersAddAdmin from './pages/Admin/UsersAdd';
import UsersViewAdmin from './pages/Admin/UsersView';
import UsersEditAdmin from './pages/Admin/UsersEdit';

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                {/* hunt item routes */}
                <Route path="/victory/:qrID"  />
                <Route path="/hints/:huntItemId" element={<HuntItem />} />
                
                {/* hunt routes */}
                {/* explore will be removed and replaced with hunts/id */}
                <Route path="/:huntCity" element={<Hunts />} />
                <Route path="/:huntCity/:huntId" element={<Hunt />} />
                <Route path="/seattle/explore" element={<SeattleExploreHunt />} />
               
                {/* organizer routes -- this will be if we are able to add the organizer option in time */}
                <Route path="/hunt/create" element={<Custom/>} />

                {/* admin -- YAY!!!*/}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/hunts" element={<HuntsIndexAdmin />} />
                <Route path="/admin/hunts/add" element={<HuntsAddAdmin />} />
                <Route path="/admin/hunts/view/:huntId" element={<HuntsViewAdmin />} />
                <Route path="/admin/hunts/edit/:huntId" element={<HuntsEditAdmin />} />
                <Route path="/admin/huntItems" element={<HuntItemsIndexAdmin />} />
                <Route path="/admin/huntItems/add" element={<HuntItemsAddAdmin />} />
                <Route path="/admin/huntItems/view/:huntItemId" element={<HuntItemsViewAdmin />} />
                <Route path="/admin/huntItems/edit/:huntItemId" element={<HuntItemsEditAdmin />} />
                <Route path="/admin/badges" element={<BadgesIndexAdmin />} />
                <Route path="/admin/badges/add" element={<BadgesAddAdmin />} />
                <Route path="/admin/badges/view/:badgeId" element={<BadgesViewAdmin />} />
                <Route path="/admin/badges/edit/:badgeId" element={<BadgesEditAdmin />} />
                <Route path="/admin/users" element={<UsersIndexAdmin />} />
                <Route path="/admin/users/add" element={<UsersAddAdmin />} />
                <Route path="/admin/users/view/:userId" element={<UsersViewAdmin />} />
                <Route path="/admin/users/edit/:iserId" element={<UsersEditAdmin />} />

                {/* <Route path="/admin/:huntItemId" element={<HuntItemAdmin />} />
                <Route path="/admin/:huntId" />
                <Route path="/admin/huntitem/update/:huntItemId"  />
                <Route path="/admin/huntitem/create/:huntItemId" />
                <Route path="/admin/hunt/update/:huntId" />
                <Route path="/admin/hunt/create/:huntId" /> */}

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