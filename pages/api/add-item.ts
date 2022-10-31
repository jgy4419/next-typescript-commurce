import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_vs2MrZQXHVkhJy1jZJzHCwUwWcmDlR6JI1epAnuygJv',
})

const databaseId = '2a58281b6be84887b270dd3fb1a4383b';

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name
            }
          }
        ]
      },
    })
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  if (name == null) {
    return res.status(400).json({message: "No name"})
  }

  await addItem(String(name))

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} added!` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added..` })
  }
}
