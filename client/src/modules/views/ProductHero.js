import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Auth from '../../utils/auth';

const backgroundImage =
  '/img/theme/hero1.png';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Let the Hunt Begin
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: '64px!important', mt: { sx: '64px!important', sm: '5rem!important' } }}
      >
        Discover the new, the old, the trendy, and the historic &ndash; all over the world.
      </Typography>
      {Auth.loggedIn() ? (
      <Button
        color="primary"
        variant="contained"
        size="large"
        component="a"
        href="/start"
        sx={{ minWidth: 400 }}
      >
        Start a Scavenger Hunt
      </Button>
      ) : (
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/signup"
        sx={{ minWidth: 400 }}
      >
        Register
      </Button>
      )}
      <Typography variant="body2" color="inherit" sx={{ mt: '1rem!important' }}>
        Discover your city
      </Typography>
    </ProductHeroLayout>
  );
}
