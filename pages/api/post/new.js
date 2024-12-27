import prisma from '@/util/database';
export default function handler(req, res) {
  if (req.method == 'POST') {
    console.log(req.body);
    return res.status(200).json('글좀 잘 쓰자');
  }
}
