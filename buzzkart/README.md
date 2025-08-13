# BuzzKart

BuzzKart is a simple, static affiliate marketing website designed to showcase products from Temu, AliExpress, and Amazon. It's built with plain HTML, CSS, and JavaScript, and it uses a `products.json` file as a simple database.

## How it Works

The site displays products from the `products.json` file. Each page (`index.html`, `temu.html`, etc.) filters the products based on the view. The affiliate links are automatically tagged with your affiliate IDs, which are configured in the `config.json` file.

## Getting Started

1.  **Configure your settings:** Open `config.json` and set your own `admin_password`. You should also add your affiliate IDs for `amazon_tag` and `temu_affiliate_id`.

2.  **Add products:** To add products, open `admin.html` in your browser.
    *   Enter the admin password you set in `config.json`.
    *   You can either fill in the product details manually or use the "Fetch Viral Product" button.

### "Automatic" Viral Products

The "Fetch Viral Product" button simulates fetching trending products from an API. It pulls data from the `viral_products.json` file. To customize the list of "viral" products, you can edit this file.

In a real-world scenario, you would replace this simulation with a backend script that fetches data from the actual affiliate APIs (Amazon PA-API, AliExpress Affiliate API, etc.) and updates `products.json` automatically.

### Adding a Product

1.  After filling in the form on the admin page, click "Generate files".
2.  Copy the JSON output from the text box.
3.  Open `products.json` and paste the new product object into the array. Make sure to add a comma between objects if necessary.
4.  The "Generate files" button will also download an HTML redirector file. Upload this file to the `p/` directory on your server. This is necessary for the product sharing links to work correctly.

## Customization

*   **Styling:** All styles are in `style.css`. You can modify this file to change the look and feel of the site.
*   **Logo:** The logo images are in the `assets/` directory. You can replace them with your own.
*   **Functionality:** The core logic is in `script.js`. You can extend it to add new features.
