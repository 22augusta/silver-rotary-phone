import { AppDataSource } from './data-source';
import { app } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar DataSource:', error);
    process.exit(1);
  }
}

bootstrap();
