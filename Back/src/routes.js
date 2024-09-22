import { Router } from "express";
import { UsuarioController } from "./controllers/usuarioController.js";
import { PetController } from "./controllers/petController.js";
import { ServicoController } from "./controllers/servicoController.js";
import { AgendamentoController } from "./controllers/agendamentoController.js";
import { HospedagemController } from "./controllers/hospedagemController.js";
import { AuthController } from "./controllers/authController.js";
import { ProfissionalController } from "./controllers/profissionalController.js";
import imageUpload from '../src/helpers/image-upload.js'




const router = Router()

const usuarioController = new UsuarioController();
const petController = new PetController();
const servicoController = new ServicoController();
const agendamentoController = new AgendamentoController();
const hospedagemController = new HospedagemController();
const authController = new AuthController();
const profissionalController = new ProfissionalController();


router.post('/login', authController.login);

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/pets', usuarioController.listarPetsPorNome);
router.get('/usuariosTipo', usuarioController.listarUsersTipoUsuario);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.get('/usuarios/:id/pets', usuarioController.listarPetsDoUsuario);
router.get('/usuarios/:id/agendamentos', usuarioController.listarAgendamentosDoUsuario);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.deletarUsuario);


router.post('/pets', imageUpload.single('imagemUrl'), petController.criarPet);
router.get('/pets', petController.listarPets);
router.get('/pets/:id', petController.buscarPetPorId);
router.put('/pets/:id', petController.atualizarPet);
router.delete('/pets/:id', petController.deletarPet);


router.post('/servicos', imageUpload.single('imagemUrl'), servicoController.criarServico);
router.get('/servicos', servicoController.listarServicos);
router.get('/servicos/:id', servicoController.buscarServicoPorId);
router.put('/servicos/:id', servicoController.atualizarServico);
router.delete('/servicos/:id', servicoController.deletarServico);


router.post('/agendamentos', agendamentoController.criarAgendamento);
router.get('/agendamentos', agendamentoController.listarAgendamentos);
router.get('/agendamentos/:id', agendamentoController.buscarAgendamentoPorId);
router.get('/agendamentosData/data', agendamentoController.buscarAgendamentosPorData);
router.put('/agendamentos/:id', agendamentoController.atualizarAgendamento);
router.delete('/agendamentos/:id', agendamentoController.deletarAgendamento);


router.post('/hospedagens', hospedagemController.criarHospedagem);
router.get('/hospedagens', hospedagemController.listarHospedagens);
router.get('/hospedagens/:id', hospedagemController.buscarHospedagemPorId);
router.put('/hospedagens/:id', hospedagemController.atualizarHospedagem);
router.delete('/hospedagens/:id', hospedagemController.deletarHospedagem);


router.post('/profissionais', profissionalController.criarProfissional);
router.get('/profissionais', profissionalController.listarProfissionais);
router.get('/profissionais/:id', profissionalController.buscarProfissionalPorId);
router.put('/profissionais/:id', profissionalController.atualizarProfissional);
router.delete('/profissionais/:id', profissionalController.deletarProfissional);


export { router }