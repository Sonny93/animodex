import { SearchApi } from "lib/search";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const searchTerm = req.query?.term;
    if (!searchTerm) {
      return res.status(400).send({
        error: "SearchTerm (query) manquant",
      });
    }

    const searchApi = new SearchApi();
    const { results } = await searchApi.search(searchTerm as string);

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(400).send({
      error:
        "Une erreur est survenue lors de la création de la catégorie (category/create->createCategory)",
    });
  }
}
