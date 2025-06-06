create database SoyTrack;

use SoyTrack;

-- TABELAS

create table empresa(
idEmpresa  int primary key auto_increment,
cnpj char(14),
nome varchar(45),
logradouro varchar(45),
num varchar(5),
bairro varchar(45),
cidade varchar(45),
UF char(2),
CEP char(8)
);

create table token (
idToken char(8) primary key,
statustoken boolean,
dtCriacao datetime default current_timestamp,
duracaoHoras int,
FKempresa int,
constraint fkempresatoken foreign key (FKempresa)
	references empresa(idEmpresa)
);

create table nivelFunc (
idNivel int primary key auto_increment,
descricao varchar(45),
tipo int
);

create table funcionario(
idFuncionario int auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(30),
permissao boolean,
FKempresa int,
FKnivel int not null,
constraint PKfkidFUNCIONARIO primary key (idFuncionario, FKempresa),
constraint FKempresafuncionario foreign key (FKempresa)
	references empresa(idEmpresa),
constraint FKnivelfuncionario foreign key (FKnivel)
	references nivelFunc(idNivel)
);

create table silo(
idSilo int primary key auto_increment,
altura float,
diametro float,
nomeSilo int not null unique,
FKempresa int,
constraint FKempresasilo foreign key (FKempresa)
	references empresa(idEmpresa)
);

create table parametro (
idParametro int primary key auto_increment,
distanciaMAX float,
nivel int
);

create table SiloParametro (
FKsilo int,
FKparametro int,
constraint PKsiloparametro primary key (FKsilo, FKparametro),
constraint FKsiloparametro foreign key (FKsilo)
	references silo(idSilo),
constraint FKparametrosilo foreign key (FKparametro)
	references parametro (idParametro)
);

create table sensor(
idSensor int primary key auto_increment,
nome varchar(10),
FKsilo int unique,
constraint FKsilosensor foreign key (FKsilo)
	references silo(idSilo)
);

create table captura(
idCaptura int auto_increment,
distancia float,
dtCaptura datetime default current_timestamp,
FKsensor int,
constraint PKfkidREGISTRO primary key (idCaptura, FKsensor),
constraint FKsensorregistro foreign key (FKsensor)
	references sensor(idSensor)
);

create table alerta (
idAlerta int auto_increment, 
nome varchar(45),
nivel int,
FKcaptura int,
constraint PKalerta primary key (idAlerta, FKcaptura),
constraint FKalertacaptura foreign key (FKcaptura)
	references captura(idCaptura)
);


-- INSERTS

insert into empresa (cnpj, nome, logradouro, num, bairro, cidade, UF, CEP) values
('98765432000110', 'Sementec', 'Rua das Sementes', '45', 'Bairro 123', 'Barreiras', 'BA', '02138879');

insert into token (idToken, statustoken, duracaoHoras, FKempresa) values
('99182237', 1, 3, 1);

insert into nivelFunc values
(default, 'Nível mais alto para usuários', 1),
(default, 'Nível mais baixo para usuários', 2),
(default, 'Nível específico para os desenvolvedores', 3);

insert into funcionario (nome, email, senha, permissao, FKempresa, FKnivel) values
('Rafael', 'rafael@sementec.com', 'rafael123', 1, 1, 1),
('Carla', 'carla@sementec.com', 'carla123', 1, 1, 2),
('João', 'joao@sementec.com', 'joao123', 1, 1, 2),
('Marcio', 'marcio@sementec.com', 'marcio123', 1, 1, 2);

insert into parametro (distanciaMAX, nivel) values
(1, 3),
(0.5, 2),
(0.2, 1);

insert into silo (altura, diametro, nomeSilo, FKempresa) values
(7, 7, 1, 1),
(7, 7, 2, 1),
(7, 7, 3, 1);

insert into SiloParametro values
(1, 1),
(1, 2),
(1, 3);

insert into sensor (nome, FKsilo) values
('HC-SR04', 1),
('HC-SR04', 2),
('HC-SR04', 3);

insert into captura (distancia, FKsensor) values
(7, 1),
(6, 1),
(5, 1),
(4, 1),
(3, 1),
(2, 1),
(1, 1),
(0.5, 1),
(0.2, 1);

insert into captura (distancia, FKsensor) values
(7, 2),
(6, 2),
(5, 2),
(4, 2),
(3, 2),
(2, 2),
(1, 2),
(0.5, 2),
(0.2, 2);

insert into captura (distancia, FKsensor) values
(7, 3),
(7, 3),
(7, 3),
(7, 3),
(4, 3),
(4, 3),
(2, 3),
(1, 3),
(0.5, 3);

insert into alerta (nome, nivel, FKcaptura) values
('Leve', 3, 26),
('Moderado', 2, 27);

insert into alerta (nome, nivel, FKcaptura) values
('Leve', 3, 16),
('Moderado', 2, 17),
('Grave', 1, 18);

insert into alerta (nome, nivel, FKcaptura) values
('Leve', 3, 7),
('Moderado', 2, 8),
('Grave', 1, 9);

-- Selects usados na dashboard/site institucional

select * from empresa e left join silo s
		on e.idEmpresa = s.FKempresa
        left join sensor sen
        on s.idSilo = sen.FKsilo
        left join captura c
        on sen.idSensor = c.FKsensor
        left join alerta a
        on c.idCaptura = a.FKcaptura
        where e.idEmpresa = 1;
        
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
        where e.idEmpresa = 1 and s.nomeSilo = 1
        order by dtCaptura desc
        limit 7;
        
        select * from captura;
        
select count(distinct(idSilo)) as quantidadeSILOS
			from silo
            join empresa
            on silo.FKempresa = empresa.idEmpresa
            where empresa.idEmpresa = 1;

select e.idEmpresa,
		s.idSilo,
        c.idCaptura,
        truncate(concat((s.altura) - c.distancia), 2) as distancia 
		from empresa e left join silo s
		on e.idEmpresa = s.FKempresa
        left join sensor sen
        on s.idSilo = sen.FKsilo
        left join captura c
        on sen.idSensor = c.FKsensor
        where e.idEmpresa = 1 and (select max(dtCaptura) from captura)
        group by s.idSilo
        order by dtCaptura desc;
        
select e.idEmpresa,
		s.idSilo,
		c.idCaptura,
		truncate((s.altura - c.distancia), 2) AS distancia,
		c.dtCaptura
		from empresa e
		join silo s ON e.idEmpresa = s.FKempresa
		join sensor sen ON s.idSilo = sen.FKsilo
		join captura c ON sen.idSensor = c.FKsensor
		where e.idEmpresa = 1
		and c.dtCaptura = (
			select max(cap.dtCaptura)
            from captura cap
            join sensor ss
            on ss.idSensor = cap.FKsensor
            where ss.FKsilo = s.idSilo
			)
		order by c.dtCaptura desc;
        
        select count(*)
		from empresa e
		join silo s ON e.idEmpresa = s.FKempresa
		join sensor sen ON s.idSilo = sen.FKsilo
		join captura c ON sen.idSensor = c.FKsensor
		where e.idEmpresa = 1
		and c.dtCaptura = (
			select max(cap.dtCaptura)
            from captura cap
            join sensor ss
            on ss.idSensor = cap.FKsensor
            where ss.FKsilo = s.nomeSilo
			)
		order by c.dtCaptura desc;
        
insert into captura (distancia, FKsensor) values
(4, 1);

select * from sensor;

insert into silo (altura, diametro, nomeSilo, FKempresa) values
(7, 3.5, 7, 1);

select * from silo;

select * from sensor;


			select e.idEmpresa, s.idSilo, max(c.dtCaptura) as dt
			from empresa e
			join silo s ON e.idEmpresa = s.FKempresa
			join sensor sen ON s.idSilo = sen.FKsilo
			join captura c ON sen.idSensor = c.FKsensor
			group by s.idSilo;

    select e.idEmpresa,
		s.idSilo,
		c.idCaptura,
		truncate((s.altura - c.distancia), 2) AS distancia,
		c.dtCaptura
        from empresa e
		join silo s ON e.idEmpresa = s.FKempresa
		join sensor sen ON s.idSilo = sen.FKsilo
		join captura c ON sen.idSensor = c.FKsensor;


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
        where e.idEmpresa = 1 and a.idAlerta is not null
        order by idEmpresa;
        
select * from captura;
        
insert into alerta (nome, nivel, FKcaptura) values
('grave', 3, 171);

insert into captura (distancia, FKsensor) values
(5.1, 2);

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
	where e.idEmpresa = 1 and c.distancia > 5
	order by idSilo;
    
    select nomeSilo from 
			empresa e 
            join silo s on e.idEmpresa = s.FKempresa
            join sensor sen on s.idSilo = sen.FKsilo
            join captura c on sen.idSensor = c.FKsensor
            join alerta a on c.idCaptura = a.FKcaptura
            having (
            select max(count(idAlerta)) from
			empresa e 
            join silo s on e.idEmpresa = s.FKempresa
            join sensor sen on s.idSilo = sen.FKsilo
            join captura c on sen.idSensor = c.FKsensor
            join alerta a on c.idCaptura = a.FKcaptura
            group by FKsensor
            );
            
select s.idSilo, count(idAlerta) as qntAlertas from
			empresa e 
            join silo s on e.idEmpresa = s.FKempresa
            join sensor sen on s.idSilo = sen.FKsilo
            join captura c on sen.idSensor = c.FKsensor
            left join alerta a on c.idCaptura = a.FKcaptura
            group by FKsensor;
            
select nomeSilo, qntAlertas from
	(select s.nomeSilo, count(idAlerta) as qntAlertas from
	empresa e
	join silo s on e.idEmpresa = s.FKempresa
	join sensor sen on s.idSilo = sen.FKsilo
	join captura c on sen.idSensor = c.FKsensor
	left join alerta a on c.idCaptura = a.FKcaptura
    where idEmpresa = 1
		AND c.dtCaptura >= CURRENT_DATE - INTERVAL 30 DAY
	group by FKsensor) as selecte
order by qntAlertas desc limit 1;

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
            and idEmpresa = 1;
            
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
		where idEmpresa = 1;
            
select * from alerta;

select * from captura;

insert into captura (distancia, FKsensor) values
(1, 1);

use soytrack;

select * from captura;

insert into alerta (nome, nivel, FKcaptura) values
('grave', 3, 199);

insert into silo (altura, diametro, nomeSilo, FKempresa) values
(7, 3.5, 7, 1);

select * from silo;

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
        where e.idEmpresa = 1 and s.nomeSilo = 6
        order by idSilo;
        
select altura, (diametro / 2) as raio from silo
			join empresa
            on FKempresa = idEmpresa
            where idEmpresa = 1 and nomeSilo = 1;
            
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
		where idEmpresa = 1 and nomeSilo = 1
        order by idAlerta desc
        limit 5;
        
insert into alerta (nome, nivel, FKcaptura) values
('moderado', 3, 204);

insert into alerta (nome, nivel, FKcaptura) values
('moderado', 3, 206);

select * from captura;

select count(idAlerta)
		from alerta
		join captura
		on idCaptura = FKcaptura
		join sensor
		on idSensor = FKsensor
		join silo
		on idSilo = FKsilo
		join empresa
		on idEmpresa = FKempresa
		where idEmpresa = 1 and nomeSilo = 1 	
        and alerta.nome = 'grave' 
        and dtCaptura >= CURRENT_DATE - INTERVAL 30 DAY
        order by idAlerta desc;
        
select f.* from funcionario f join empresa
	on idEmpresa = FKempresa
		where idEmpresa = 1 and permissao = 0;
        
insert into funcionario (nome, email, senha, permissao, FKempresa, FKnivel) values
('Andre', 'davi@sementec.com', 'davi123', 0, 1, 2),
('Rebeca Andrade', 'rebeca@sementec.com', 'rebeca123', 0, 1, 2),
('Manoel Gomes Caneta Azul', 'manoel@sementec.com', 'manoel123', 0, 1, 2);

insert into funcionario (nome, email, senha, permissao, FKempresa, FKnivel) values
('Pablo Marçal', 'davi@sementec.com', 'davi123', 0, 1, 2);

update funcionario set permissao = 1 where idFuncionario = 1;

select * from funcionario;

delete from funcionario where idFuncionario = 6;