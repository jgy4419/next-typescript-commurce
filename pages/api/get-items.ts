import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_vs2MrZQXHVkhJy1jZJzHCwUwWcmDlR6JI1epAnuygJv',
})

const databaseId = '2a58281b6be84887b270dd3fb1a4383b';

async function getItems() {
  try {
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            {
                property: "price",
                direction: 'ascending'
            }
        ]
    })
      console.log(response);
      return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
    items?: any,
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItems();
      // response? 는 값이 있을 수도 없을 수도 있다는 뜻.
    res.status(200).json({ items: response?.results, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
