# setores (linhas = horários, colunas = dias)
incendio = [[0,2,4,6,8,10,12],
		    [1,3,5,7,9,11,13]]

socorro = [[14,16,18,20,22,24,26],
		   [15,17,19,21,23,25,27]]

telefone = [[28,30,32,34,36,38,40],
		    [29,31,33,35,37,39,41]]
#dia inicia em 0 = domingo e vai até 6 = sábado
dia = 0

def atribuir_pessoas_setor(pessoas, setor, dia):
	for i in range(len(pessoas)):
		while pessoas[i][1] > 0 and dia < 7:
			if setor == incendio: # controle do setor de incêndio
				if (type(setor[0][dia]) == int) and (pessoas[i][0] not in [socorro[0][dia], telefone[0][dia]]):
					setor[0][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						if all(pessoas[i][0] == x for x in [setor[0][dia], setor[1][dia]]):
							dia += 1
						else:
							dia = 0
						atribuir_pessoas_setor(pessoas, socorro, dia)
						break
				elif (type(setor[1][dia]) == int) and (pessoas[i][0] not in [socorro[1][dia], telefone[1][dia]]):
					setor[1][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						if all(pessoas[i][0] == x for x in [setor[0][dia], setor[1][dia]]):
							dia += 1
						else:
							dia = 0
						atribuir_pessoas_setor(pessoas, socorro, dia)
						break
				else:
					dia += 1
					atribuir_pessoas_setor(pessoas, socorro, dia)
					break
			elif setor == socorro: # controle do setor de socorro
				if (type(setor[0][dia]) == int) and (pessoas[i][0] not in [incendio[0][dia], telefone[0][dia]]):
					setor[0][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						if all(pessoas[i][0] == x for x in [setor[0][dia], setor[1][dia]]):
							dia += 1
						else:
							dia = 0
						atribuir_pessoas_setor(pessoas, telefone, dia)
						break
				elif (type(setor[1][dia]) == int) and (pessoas[i][0] not in [incendio[1][dia], telefone[1][dia]]):
					setor[1][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						if all(pessoas[i][0] == x for x in [setor[0][dia], setor[1][dia]]):
							dia += 1
						else:
							dia = 0
						atribuir_pessoas_setor(pessoas, telefone, dia)
						break
				else:
					dia += 1
					atribuir_pessoas_setor(pessoas, telefone, dia)
					break
			else: # controle do setor de telefone
				if (type(setor[0][dia]) == int) and (pessoas[i][0] not in [incendio[0][dia], socorro[0][dia]]):
					setor[0][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						if all(pessoas[i][0] == x for x in [setor[0][dia], setor[1][dia]]):
							dia += 1
						else:
							dia = 0
						atribuir_pessoas_setor(pessoas, incendio, dia)
						break
				elif (type(setor[1][dia]) == int) and (pessoas[i][0] not in [incendio[1][dia], socorro[1][dia]]):
					setor[1][dia] = pessoas[i][0]
					pessoas[i][1] -= 1
					if (type(setor[0][dia]) != int and type(setor[1][dia]) != int):
						dia += 1
						atribuir_pessoas_setor(pessoas, incendio, dia)
						break
				else:
					dia += 1
					atribuir_pessoas_setor(pessoas, incendio, dia)
					break


# imprimir horário do setor
def mostrar_setor(setor):
	print("|DOM______|SEG______|TER______|QUA______|QUI______|SEX______|SAB______|")
	for l in range(len(setor)):
		for c in range(len(setor[0])):
			if c < len(setor[0]) - 1:
				if type(setor[l][c]) != int:
					print(f"|{setor[l][c]}", end='')
				elif type(setor[l][c]) == int and setor[l][c] < 10:
					print(f"|{setor[l][c]}________", end='')
				else:
					print(f"|{setor[l][c]}_______", end='')
			else:
				if type(setor[l][c]) != int:
					print(f"|{setor[l][c]}|")
				elif type(setor[l][c]) == int and setor[l][c] < 10:
					print(f"|{setor[l][c]}________|")
				else:
					print(f"|{setor[l][c]}_______|")
	print()
def mostrar_setores():
	print("INCENDIO")
	mostrar_setor(incendio)
	print("SOCORRO")
	mostrar_setor(socorro)
	print("TELEFONE")
	mostrar_setor(telefone)

# resetar setor
def reset_setor(setor):
	if setor == incendio:
		setor[0] = [0,2,4,6,8,10,12]
		setor[1] = [1,3,5,7,9,11,13]
	elif setor == socorro:
		setor[0] = [14,16,18,20,22,24,26]
		setor[1] = [15,17,19,21,23,25,27]
	else:
		setor[0] = [28,30,32,34,36,38,40]
		setor[1] = [29,31,33,35,37,39,41]
	return setor
def reset_setores(incendio, socorro, telefone):
	incendio = reset_setor(incendio)
	socorro = reset_setor(socorro)
	telefone = reset_setor(telefone)


# TESTES
for l in range(100):
	# matriz de pessoas + quantidade de aparições
	pessoas = []
	# atribuição dos valores do arquivo de entrada à matriz de pessoas
	with open(f"CSP_Bombeiros/entradas/entrada_{l+1}.txt", "r", encoding="ISO-8859-1") as arquivo:
	    for linha in arquivo:
	        linha = linha.strip()
	        nome, valor = linha.split(", ")
	        pessoas.append([nome, int(valor)])
	# teste unitário
	if l+1 < 10:
		print(f"{'-'*26}LISTA DE PESSOAS {l+1}{'-'*27}")
	elif l+1 >= 10 and l+1 < 100:
		print(f"{'-'*26}LISTA DE PESSOAS {l+1}{'-'*26}")
	else:
		print(f"{'-'*26}LISTA DE PESSOAS {l+1}{'-'*25}")
	atribuir_pessoas_setor(pessoas, incendio, dia)
	mostrar_setores()
	print()
	reset_setores(incendio, socorro, telefone)
