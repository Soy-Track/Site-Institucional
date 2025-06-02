var database = require("../database/config");

function selecinardadosgrafico(idempresa, idsilo) {
    var instrucaoSql = `
    select e.idEmpresa,
		s.idSilo,
        c.idCaptura,
        c.dtCaptura,
        truncate(concat((s.altura) - c.distancia), 2) as distancia 
		from empresa e left join silo s
		on e.idEmpresa = s.FKempresa
        left join sensor sen
        on s.idSilo = sen.FKsilo
        left join captura c
        on sen.idSensor = c.FKsensor
        where e.idEmpresa = ${idempresa} and s.nomeSilo = ${idsilo}
        order by dtCaptura desc
        limit 7;
    `
    return database.executar(instrucaoSql);
}

function contarsilos(idempresa) {
    var instrucaoSql = `
    select count(distinct(idSilo)) as quantidadeSILOS
		from silo
        join empresa
        on silo.FKempresa = empresa.idEmpresa
        where empresa.idEmpresa = ${idempresa}
    `
    return database.executar(instrucaoSql);
}

function exibirsilosbarra(idempresa) {
    var instrucaoSql = `
    select e.idEmpresa,
		s.idSilo,
		c.idCaptura,
		truncate((s.altura - c.distancia), 2) AS distancia,
		c.dtCaptura
        from empresa e
		join silo s ON e.idEmpresa = s.FKempresa
		join sensor sen ON s.idSilo = sen.FKsilo
		join captura c ON sen.idSensor = c.FKsensor
        join (
			select e.idEmpresa, s.idSilo, max(c.dtCaptura) as dt
			from empresa e
			join silo s ON e.idEmpresa = s.FKempresa
			join sensor sen ON s.idSilo = sen.FKsilo
			join captura c ON sen.idSensor = c.FKsensor
			group by s.idSilo
		) datas_mais_recentes on datas_mais_recentes.dt = c.dtCaptura and s.idSilo = datas_mais_recentes.idSilo
        where e.idEmpresa = ${idempresa}
        order by idSilo;
    `
    return database.executar(instrucaoSql);
}

function exibirkpi1(idempresa) {
    var instrucaoSql = `
    select e.idEmpresa,
		s.idSilo,
        nomeSilo,
		c.idCaptura,
		truncate((s.altura - c.distancia), 2) AS distancia,
		c.dtCaptura,
        distancia,
        a.idAlerta is not null as TemAlerta
        from empresa e
		left join silo s ON e.idEmpresa = s.FKempresa
		left join sensor sen ON s.idSilo = sen.FKsilo
		left join captura c ON sen.idSensor = c.FKsensor
        join (
			select e.idEmpresa, s.idSilo, max(c.dtCaptura) as dt
			from empresa e
			join silo s ON e.idEmpresa = s.FKempresa
			join sensor sen ON s.idSilo = sen.FKsilo
			join captura c ON sen.idSensor = c.FKsensor
			group by s.idSilo
		) datas_mais_recentes on datas_mais_recentes.dt = c.dtCaptura and s.idSilo = datas_mais_recentes.idSilo
        left join alerta a on c.idCaptura = a.FKcaptura
        where e.idEmpresa = ${idempresa} and a.idAlerta is not null
        order by idEmpresa;
    `
    return database.executar(instrucaoSql);
}

function exibirkpi2(idempresa) {
    var instrucaoSql = `
    select e.idEmpresa,
	    s.idSilo,
    	c.idCaptura,
    	truncate((s.altura - c.distancia), 2) AS distancia,
	    c.dtCaptura,
        c.distancia,
        s.nomeSilo
	    from empresa e
    	join silo s ON e.idEmpresa = s.FKempresa
    	join sensor sen ON s.idSilo = sen.FKsilo
    	join captura c ON sen.idSensor = c.FKsensor
    	join (
    		select e.idEmpresa, s.idSilo, max(c.dtCaptura) as dt
    		from empresa e
    		join silo s ON e.idEmpresa = s.FKempresa
	    	join sensor sen ON s.idSilo = sen.FKsilo
		    join captura c ON sen.idSensor = c.FKsensor
		    group by s.idSilo
        ) datas_mais_recentes on datas_mais_recentes.dt = c.dtCaptura and s.idSilo = datas_mais_recentes.idSilo
        where e.idEmpresa = ${idempresa} and c.distancia > 5
        order by idSilo;
        `
    return database.executar(instrucaoSql);
}

function exibirkpi3(idempresa) {
    var instrucaoSql = `
    select nomeSilo, qntAlertas from
        (select s.nomeSilo, count(idAlerta) as qntAlertas from
        empresa e
        join silo s on e.idEmpresa = s.FKempresa
        join sensor sen on s.idSilo = sen.FKsilo
        join captura c on sen.idSensor = c.FKsensor
        left join alerta a on c.idCaptura = a.FKcaptura
        where idEmpresa = ${idempresa}
            AND c.dtCaptura >= CURRENT_DATE - INTERVAL 30 DAY
        group by FKsensor) as selecte
    order by qntAlertas desc limit 1;
    `
    return database.executar(instrucaoSql);
}

function exibirkpi4(idempresa) {
    var instrucaoSql = `
    select count(*) total_alertas from alerta a
        join captura c
        on idCaptura = FKcaptura
        join sensor
        on idSensor = FKsensor
        join silo 
        on idSilo = FKsilo
        join empresa
        on idEmpresa = FKempresa
        where a.nome = 'Grave' and 
        c.dtCaptura >= CURRENT_DATE - INTERVAL 30 DAY
        and idEmpresa = ${idempresa};
    `
    return database.executar(instrucaoSql);
}

function alertar(idempresa) {
    var instrucaoSql = `
    select silo.nomeSilo, 
            alerta.*, 
            captura.* 
            from alerta
            join captura
            on idCaptura = FKcaptura
            join sensor
            on idSensor = FKsensor
            join silo
            on idSilo = FKsilo
            join empresa
            on idEmpresa = FKempresa
            where idEmpresa = ${idempresa};
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    selecinardadosgrafico,
    contarsilos,
    exibirsilosbarra,
    exibirkpi1,
    exibirkpi2,
    exibirkpi3,
    exibirkpi4,
    alertar,
}