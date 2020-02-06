const mongoose = require('mongoose')
const Pacientes = require('./pacientes')

let PacientesController = {}

PacientesController.Listar = async (req, res) => {

  const pacientes = await Pacientes.find()

  res.json({ pacientes });
}

PacientesController.novo = async (req, res) => {
  let novopaciente = new Pacientes({
    nome: req.body.nome,
    idade: req.body.idade,
    dataNasc: req.body.dataNasc,
  })
  const paciente = await novopaciente.save()
  if (paciente) {
    res.json({ success: true, paciente, form: req.body, res: 'Criado com sucesso.' });
  } else {
    res.json({ success: false, err: 'OPS!!! Some error has ocurred', res: 'Erro ao salvar aluno.', form: req.body });
  }
}

PacientesController.buscarPorId = async (req, res) => {
  const filtro = {
    _id: req.params.id,
  }

  const paciente = await Pacientes.findOne(filtro);

  res.json({ paciente });
}

PacientesController.delete = async (req, res) => {
  const filtro = {
    _id: req.params.id,
  };

  const paciente = await Pacientes.findOne(filtro);

  await paciente.remove()

  if (paciente) {
    res.json({ success: true });
  } else {
    res.json({ success: false, err: 'An error has occured' });
  }
};

PacientesController.edit = async (req, res) => {
  Pacientes.findOneAndUpdate({ _id: req.params.id },
    {
        $set: {
            nome: req.body.nome,
            idade: req.body.idade,
            dataNasc: req.body.dataNasc
        }
    }, {
        upsert: true
    })
    .then(() => res.json({ success: true, message: "Paciente atualizado com sucesso", statusCode: 500 }))
    .catch((err) => res.json({ success: false, message: err, statusCode: 500 }))

};

module.exports = PacientesController