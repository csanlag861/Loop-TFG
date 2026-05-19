import { inngest } from '@/lib/inngest/client';
import { sendPasswordResetEmail } from '@/lib/inngest/functions';
import { All, Controller, Req, Res } from '@nestjs/common';
import { serve } from 'inngest/express';

const inngestServe = serve({
  client: inngest,
  functions: [sendPasswordResetEmail],
});

@Controller('inngest')
export class InngestController {
  @All()
  async handler(@Req() req: Request, @Res() res: Response) {
    return await inngestServe(req, res);
  }
}
