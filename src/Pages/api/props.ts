import { getCachedProps } from '@/lib/server/getProps';

import type { Props } from '@/stores/props';
import type { Request, Response } from 'express';

export default async function handler(
  _req: Request,
  res: Response<Props>,
) {
  try {
    const props = await getCachedProps();
    res.status(200).json(props);
  } catch (error) {
    console.warn(error);

    res.status(500);
  }
}