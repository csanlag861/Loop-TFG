import { Test, TestingModule } from '@nestjs/testing';
import { TecnologiaService } from './tecnologia.service';
import { PrismaService } from '../prisma/prisma.service';

const mockTecnologiaService = {
  tecnologia: {
    findMany: jest.fn(),
  },
};

describe('TecnologiaService', () => {
  let service: TecnologiaService;
  let prisma: typeof mockTecnologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TecnologiaService,
        {
          provide: PrismaService,
          useValue: mockTecnologiaService,
        },
      ],
    }).compile();

    service = module.get<TecnologiaService>(TecnologiaService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTecnologias', () => {
    it('debería devolver un array de tecnologías', async () => {
      const tecnologiasMock = [
        {
          id: 1,
          nombre: 'TypeScript',
          background: '#3178c6',
          border: '#235a9e',
          text: '#ffffff',
        },
        {
          id: 2,
          nombre: 'Python',
          background: '#3572A5',
          border: '#2a5a84',
          text: '#ffffff',
        },
      ];
      prisma.tecnologia.findMany.mockResolvedValueOnce(tecnologiasMock);

      const result = await service.getTecnologias();

      expect(result).toEqual(tecnologiasMock);
    });

    it('debería llamar a prisma.tecnologia.findmany con orderby nombre asc', async () => {
      prisma.tecnologia.findMany.mockResolvedValueOnce([]);

      await service.getTecnologias();

      expect(prisma.tecnologia.findMany).toHaveBeenCalledWith({
        orderBy: { nombre: 'asc' },
      });
    });

    it('debería devolver un array vacio si no hay tecnologías', async () => {
      prisma.tecnologia.findMany.mockResolvedValueOnce([]);

      const result = await service.getTecnologias();

      expect(result).toEqual([]);
    })
  });
});
