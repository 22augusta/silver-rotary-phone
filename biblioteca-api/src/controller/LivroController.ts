import { Router, Request, Response } from 'express';
import { LivroRepository } from '../repository/LivroRepository';

export const livroRouter = Router();
const repository = new LivroRepository();


function validarPayload(body: any) {
  const erros: string[] = [];
  const anoAtual = new Date().getFullYear();

  if (!body.titulo || String(body.titulo).trim().length < 2)
    erros.push('titulo é obrigatório e deve ter pelo menos 2 caracteres.');

  if (!body.autor || String(body.autor).trim().length < 2)
    erros.push('autor é obrigatório e deve ter pelo menos 2 caracteres.');

  if (!body.isbn || String(body.isbn).trim().length < 10 || String(body.isbn).trim().length > 17)
    erros.push('isbn é obrigatório e deve ter entre 10 e 17 caracteres.');

  const ano = Number(body.anoPublicacao);
  if (!Number.isInteger(ano) || ano < 1450 || ano > anoAtual)
    erros.push(`anoPublicacao deve ser inteiro entre 1450 e ${anoAtual}.`);

  if (typeof body.disponivel !== 'boolean')
    erros.push('disponivel deve ser booleano (true/false).');

  return erros;
}

/** POST /api/livros - Criar */
livroRouter.post('/', async (req: Request, res: Response) => {
  const erros = validarPayload(req.body);
  if (erros.length) return res.status(400).json({ erros });

  // regra: ISBN único
  if (await repository.existsByIsbn(req.body.isbn)) {
    return res.status(409).json({ erro: 'ISBN já cadastrado.' });
  }

  const novo = await repository.create({
    titulo: req.body.titulo,
    autor: req.body.autor,
    isbn: req.body.isbn,
    anoPublicacao: req.body.anoPublicacao,
    disponivel: req.body.disponivel
  });
  return res.status(201).json(novo);
});

/** GET /api/livros - Ler todos */
livroRouter.get('/', async (_req: Request, res: Response) => {
  const lista = await repository.findAll();
  return res.json(lista);
});

/** GET /api/livros/:id - Ler por ID */
livroRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const livro = await repository.findById(id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
  return res.json(livro);
});

/** PUT /api/livros/:id - Atualizar tudo */
livroRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const erros = validarPayload(req.body);
  if (erros.length) return res.status(400).json({ erros });

  // se alterou ISBN, garantir unicidade
  if (req.body.isbn) {
    const jaExiste = await repository.existsByIsbn(req.body.isbn);
    // permitir se o ISBN já pertencer ao próprio livro; checaremos abaixo após buscar
    const atual = await repository.findById(id);
    if (!atual) return res.status(404).json({ erro: 'Livro não encontrado.' });
    if (jaExiste && atual.isbn !== req.body.isbn) {
      return res.status(409).json({ erro: 'ISBN já cadastrado em outro livro.' });
    }
  }

  const atualizado = await repository.update(id, {
    titulo: req.body.titulo,
    autor: req.body.autor,
    isbn: req.body.isbn,
    anoPublicacao: req.body.anoPublicacao,
    disponivel: req.body.disponivel
  });
  if (!atualizado) return res.status(404).json({ erro: 'Livro não encontrado.' });
  return res.json(atualizado);
});

/** PATCH /api/livros/:id - Atualizar parcialmente */
livroRouter.patch('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const atual = await repository.findById(id);
  if (!atual) return res.status(404).json({ erro: 'Livro não encontrado.' });

  // validações pontuais
  const temporario = { ...atual, ...req.body };
  const erros = validarPayload(temporario);
  if (erros.length) return res.status(400).json({ erros });

  if (req.body.isbn && req.body.isbn !== atual.isbn) {
    const jaExiste = await repository.existsByIsbn(req.body.isbn);
    if (jaExiste) return res.status(409).json({ erro: 'ISBN já cadastrado em outro livro.' });
  }

  const atualizado = await repository.update(id, req.body);
  return res.json(atualizado);
});

/** DELETE /api/livros/:id - Excluir */
livroRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = await repository.delete(id);
  if (!ok) return res.status(404).json({ erro: 'Livro não encontrado.' });
  return res.status(204).send();
});
