import numpy as np
from PIL import Image
import random
import matplotlib.pyplot as plt
from collections import deque

# Configurações do AG
tam_populacao = 150
tam_cromossomo = 150  # 150 posições no cromossomo
geracoes = 500
taxa_mutacao = 0.25
mse_dez_ger = deque(maxlen=5) #mse das ultimas 5 gerações

# Carrega a imagem original
img_original = Image.open('./test2.jpg').convert('L')
# img_original = img_original.resize((64, 64))
matriz_img_original = np.array(img_original) # converte para uma matriz

# FUNÇÕES
# Função para calcular o MSE entre a imagem gerada e a imagem original
def mse(imgGer, imgOrig):
    mse = np.sum((imgGer.astype("float") - imgOrig.astype("float")) ** 2)
    mse /= float(imgGer.shape[0] * imgGer.shape[1])
    return mse

# Função para gerar imagem a partir de um cromossomo
def ger_img_cromo(cromossomo):
    # inicializa a imagem como branca (intensidade 255)
    img = np.ones((64, 64)) * 255
    qtd_pixels = len(cromossomo) // 3  # cada 3 valores do cromossomo representam um pixel
    for i in range(qtd_pixels):
        # extraindo x, y e cor do pixel a partir do cromossomo
        x = int(cromossomo[i * 3] % 64)
        y = int(cromossomo[i * 3 + 1] % 64)
        cor = cromossomo[i * 3 + 2] % 256
        img[x, y] = cor
    return img

# Função de seleção por torneio
def selecao_por_torneio(populacao, fitnesses):
    tam_torneio = 5
    selecionado = random.sample(list(zip(populacao, fitnesses)), tam_torneio)
    selecionado.sort(key=lambda x: x[1])  # ordena pelo fitness (MSE)
    return selecionado[0][0]  # retorna o melhor cromossomo do torneio

# Função de cruzamento de um ponto
def cruzamento(pai1, pai2):
    ponto_cruzamento = random.randint(0, len(pai1) - 1)
    filho1 = np.concatenate([pai1[:ponto_cruzamento], pai2[ponto_cruzamento:]])
    filho2 = np.concatenate([pai2[:ponto_cruzamento], pai1[ponto_cruzamento:]])
    return filho1, filho2

# Função de mutação
def mutacao(cromossomo, taxa_mutacao):
    if random.random() < taxa_mutacao:
        indice = random.randint(0, len(cromossomo) - 1)
        cromossomo[indice] = random.randint(0, 255)
    return cromossomo


# Inicializa a população com cromossomos aleatórios
populacao = deque()
for _ in range(tam_populacao):
    cromosssomo_aleatorio = np.random.randint(0, 256, tam_cromossomo)
    populacao.append(cromosssomo_aleatorio)

# Configurar a visualização dinâmica
plt.ion()  # Modo interativo ligado
fig, ax = plt.subplots(1, 2, figsize=(10, 5))

# Mostrar a imagem original
ax[0].imshow(matriz_img_original, cmap='gray')
ax[0].set_title("Imagem Original")

# Iniciar o algoritmo genético
melhor_cromossomo = None
melhor_fitness = float('inf')

for geracao in range(geracoes):
    fitnesses = []
    for individuo in populacao:
        img_gerada = ger_img_cromo(individuo)
        fitness = mse(img_gerada, matriz_img_original)
        if len(mse_dez_ger) < 5:
            mse_dez_ger.append(fitness)
        else:
            mse_dez_ger.popleft()
            mse_dez_ger.append(fitness)       

        fitnesses.append(fitness)

    # Encontrar o melhor cromossomo da geração
    menor_fitness = min(fitnesses) # menor fitness = menor mse (mais parecido com a img original)
    if menor_fitness < melhor_fitness:
        melhor_fitness = menor_fitness
        melhor_cromossomo = populacao[fitnesses.index(menor_fitness)]

    # Atualizar a imagem gerada dinamicamente a cada 10 gerações
    if geracao % 10 == 0:
        melhor_img = ger_img_cromo(melhor_cromossomo)
        ax[1].imshow(melhor_img, cmap='gray')
        ax[1].set_title(f"AG Aproximação (Geração {geracao}, MSE: {melhor_fitness:.2f})")
        plt.pause(0.1)  # Pausa para visualização

    # Geração da nova população
    prox_populacao = deque()
    while len(prox_populacao) < tam_populacao:
        # dif = calcula a mudança/diferença entre as últimas gerações para ver se está estagnado ou não
        dif = np.diff(mse_dez_ger)
        if len(mse_dez_ger) == 5 and len(dif[dif < 0]) > 0 and abs(np.mean(dif[dif < 0])) < 20:
            pai1 = mutacao(selecao_por_torneio(populacao, fitnesses), float('inf'))
            pai2 = mutacao(selecao_por_torneio(populacao, fitnesses), float('inf'))
            mse_dez_ger.clear()
        else:
            pai1 = selecao_por_torneio(populacao, fitnesses)
            pai2 = selecao_por_torneio(populacao, fitnesses)
        filho1, filho2 = cruzamento(pai1, pai2)
        prox_populacao.append(mutacao(filho1, taxa_mutacao))
        prox_populacao.append(mutacao(filho2, taxa_mutacao))
    if len(populacao) == tam_populacao:
        populacao.popleft()
    populacao = prox_populacao

# Mostrar a imagem final
melhor_img = ger_img_cromo(melhor_cromossomo)
ax[1].imshow(melhor_img, cmap='gray')
ax[1].set_title(f"Imagem Final (MSE: {melhor_fitness:.2f})")
plt.ioff()  # Desliga o modo interativo
plt.show()
