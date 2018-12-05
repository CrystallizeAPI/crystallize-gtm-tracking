![alt text](https://raw.githubusercontent.com/snowballdigital/crystallize-gtm-tracking/HEAD/media/logo.png 'Crosshair over box')

# crystallize-gtm-tracking

Helpers for tracking in GTM using standard Crystallize models. Makes it easy to add Google Tag Manager to your React ecommerce powered by [Crystallize headless commerce service](https://crystallize.com/developers).

Ensure to setup one custom event listener in GTM for the following entries:

- ecommerce (be sure to enable enhanced ecommerce)

## Usage

```
import { trackAddProductsToBasket, trackProductDetails } from '@crystallize/gtm-tracking/ecommerce';

trackProductDetails({ product });
trackAddProductsToBasket({ products })
```

## Usage with @crystallize/react-basket

```
const basketOptions = {
  onEmpty: products => tracking.trackRemoveProductsFromBasket({ products }),
  onAddToBasket: products => tracking.trackAddProductsToBasket({ products }),
  onRemoveFromBasket: products =>
    tracking.trackRemoveProductsFromBasket({ products })
};
```
