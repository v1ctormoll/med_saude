const Schedule = require('../models/Schedule')

const verifySchedule = {
    // Função verifica se falta mais de 360 minutos entre a tarefa que quer cancelar e o tempo atual
    Cancel: (verify) => {
        const a = new Date;

        let aux = {
            intendDay: a.getDate(),
            intendHour: a.getHours(),
            intendMinute: a.getMinutes()
        }
        if (aux.intendDay > verify.startDay) return false; //Tentando cancelar uma tarefa após já ter sido iniciada
        if (aux.intendDay < verify.startDay) return true; //Tentando cancelar uma tarefa no dia anterior
        let minut1 = aux.intendHour * 60 + aux.intendMinute;
        let minut2 = verify.startHour * 60 + verify.startMinute;
        let dif = minut2 - minut1;
        if (dif > 360) return true;
        else return false;
    },

    // Função Verifica quantas tarefas no intervadlo de 40 minutos tem previamente a escolhida para ser criada
    Prev: async (req) => { // REFEITO
        let aux = {
            startDay: req.body.startDay,
            startHour: req.body.startHour,
            startMinute: req.body.startMinute
        }
        let quant = 0;
        selectedSchedule = await Schedule.find({
            startDay: aux.startDay,
            startHour: aux.startHour,
            startMinute: aux.startMinute
        })
        quant += selectedSchedule.length;

        if (aux.startMinute == 0) { // REFEITO
            aux.startHour -= 1;
            aux.startMinute = 50;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            aux.startMinute = 40;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            aux.startMinute = 30;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
        } else { // Refeito
            aux.startMinute -= 10;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            if (aux.startMinute == 0) { // Refeito
                aux.startHour -= 1;
                aux.startMinute = 50;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
                aux.startMinute = 40;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
            } else { // Refeito
                aux.startMinute -= 10;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
                if (aux.startMinute == 0) { // Refeito
                    aux.startHour -= 1;
                    aux.startMinute = 50;
                    selectedSchedule = await Schedule.find({
                        startDay: aux.startDay,
                        startHour: aux.startHour,
                        startMinute: aux.startMinute
                    })
                    quant += selectedSchedule.length;
                }
                else { // Refeito
                    aux.startMinute -= 10;
                    selectedSchedule = await Schedule.find({
                        startDay: aux.startDay,
                        startHour: aux.startHour,
                        startMinute: aux.startMinute
                    })
                    quant += selectedSchedule.length;
                }
            }
        }
        return quant;
    },

    // Função Verifica quantas tarefas no intervadlo de 40 minutos tem após a escolhida para ser criada
    Later: async (req) => {
        let aux = {
            startDay: req.body.startDay,
            startHour: req.body.startHour,
            startMinute: req.body.startMinute
        }
        let quant = 0;
        selectedSchedule = await Schedule.find({
            startDay: aux.startDay,
            startHour: aux.startHour,
            startMinute: aux.startMinute
        })
        quant += selectedSchedule.length;

        if (aux.startMinute == 50) { // REFEITO
            aux.startHour += 1;
            aux.startMinute = 00;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            aux.startMinute = 10;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            aux.startMinute = 20;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
        } else { // REFEITO
            aux.startMinute += 10;
            selectedSchedule = await Schedule.find({
                startDay: aux.startDay,
                startHour: aux.startHour,
                startMinute: aux.startMinute
            })
            quant += selectedSchedule.length;
            if (aux.startMinute == 50) { // REFEITO
                aux.startHour += 1;
                aux.startMinute = 0;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
                aux.startMinute = 10;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
            } else { // REFEITO
                aux.startMinute += 10;
                selectedSchedule = await Schedule.find({
                    startDay: aux.startDay,
                    startHour: aux.startHour,
                    startMinute: aux.startMinute
                })
                quant += selectedSchedule.length;
                if (aux.startMinute == 50) { // REFEITO
                    aux.startHour += 1;
                    aux.startMinute = 0;
                    selectedSchedule = await Schedule.find({
                        startDay: aux.startDay,
                        startHour: aux.startHour,
                        startMinute: aux.startMinute
                    })
                    quant += selectedSchedule.length;
                }
            }
        }
        return quant;
    }
}

module.exports = verifySchedule;