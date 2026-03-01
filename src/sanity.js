import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Set up the client for fetching data in the getProps page functions
export const client = createClient({
    // Find your project ID and dataset in `sanity.json` or Sanity Studio settings
    projectId: 'foqnyu8u', // The ID we used when creating the studio
    dataset: 'production',
    apiVersion: '2024-03-01', // Use today's date or the date the project was created
    useCdn: true, // `false` if you want to ensure fresh data
});

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
// Read more: https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
