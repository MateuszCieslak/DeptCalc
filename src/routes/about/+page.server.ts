import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// export async function load({ params }) {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const p = await res.json();
// 	return {
// 		post: {
// 			title: `Title for goes here`,
// 			content: `Content for goes here`
// 		},
//         post2: p[0]
// 	};
// }