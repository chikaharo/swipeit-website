import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		// Process a POST request
		console.log("handle link req: ", req.url);
		if (!req.url) {
			return res.status(400).send("Invalid req");
		}
		// const url = new URL(req.url as string);
		// const href = url.searchParams.get("url");
		const [_, href] = req.url.split("?url=");

		if (!href) return res.status(400).send("Invalid href");

		const response = await fetch(href);
		const resData = await response.json();
		console.log({ response, resData });
		const titleMatch = resData.match(/<title>(.*?)<\/title>/);
		const title = titleMatch ? titleMatch[1] : "";
		const descMatch = resData.match(/<meta name="description" content="(.*?)"/);
		const description = descMatch ? descMatch[1] : "";
		const imageMatch = resData.match(
			/<meta property="og:image" content="(.*?)"/
		);
		const imageUrl = imageMatch ? imageMatch[1] : "";
		return res.json({
			success: 1,
			meta: {
				title,
				description,
				image: {
					url: imageUrl,
				},
			},
		});
	} else {
		// Handle any other HTTP method
		return res.status(403);
	}
}
