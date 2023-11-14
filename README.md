# TV Bland

## Tech Stack

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **TypeScript**: A typed superset of JavaScript that adds static types to the language, enhancing development experience and catching potential errors early in the process.

## Pagination

Due to limitations in the provided API, traditional offset-based or cursor-based pagination is not supported. As a result, no explicit pagination is implemented on the frontend. This limitation may lead to longer loading times, especially when retrieving a large dataset.

Creating pagination functionality on the frontend side would not significantly improve loading times in this scenario. Since the API lacks native support for efficient pagination strategies, implementing pagination on the frontend would still require fetching and processing the entire dataset.

As a trade-off between functionality and performance optimization, the decision to omit frontend pagination is intentional. This choice aims to provide a simpler user experience while acknowledging the potential impact on loading times for larger datasets.

## Components

In this project, there is no dedicated `components` folder, and components are not separated into individual files. The structure was kept simple due to the project's size and to maintain clarity.

## Getting Started

1. Install dependencies:

   npm install --force

   Note: The `--force` flag is required due to the `react-svg-star-rating` library's specific requirements. I am aware of the potential risks associated with using the `--force` flag, and it is being used here as a necessary step to address library dependencies.

2. Run the development server:

   npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
