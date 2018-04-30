# crystallize-gtm-tracking

Helpers for tracking in GTM using standard Crystallize models

Ensure to setup one custom event listener in GTM for the following entries:

* ecommerce (be sure to enable enhanced ecommerce)

## Usage

```
import { trackAddProductsToBasket, trackProductDetails } from '@crystallize/gtm-tracking/ecommerce';

trackProductDetails({ product });
trackAddProductsToBasket({ products })
```
