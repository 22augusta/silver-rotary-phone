
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'livros' })
@Unique(['isbn']) // ISBN único
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ length: 150 })
  autor!: string;

  @Column({ length: 20 })
  isbn!: string;

  @Column('int')
  anoPublicacao!: number;

  @Column({ default: true })
  disponivel!: boolean;
}
