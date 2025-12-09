import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Livro } from '../entity/Livro';

export class LivroRepository {
  private repo: Repository<Livro>;

  constructor() {
    this.repo = AppDataSource.getRepository(Livro);
  }

  async create(data: Omit<Livro, 'id'>): Promise<Livro> {
    const livro = this.repo.create(data);
    return await this.repo.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Livro | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, partial: Partial<Livro>): Promise<Livro | null> {
    const livro = await this.findById(id);
    if (!livro) return null;
    Object.assign(livro, partial);
    return await this.repo.save(livro);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async existsByIsbn(isbn: string): Promise<boolean> {
    const found = await this.repo.findOne({ where: { isbn } });
    return !!found;
  }
}
