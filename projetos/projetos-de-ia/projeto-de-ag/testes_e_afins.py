# # função apenas para fim de demonstração
# import matplotlib.pyplot as plt
# def mostrar_img(array_img_base):
# 	fig, ax = plt.subplots(1, 2, figsize=(10, 5))
# 	# Mostrar a imagem original
# 	ax[0].imshow(array_img_base, cmap='gray')
# 	ax[0].set_title("Imagem Original")
# 	plt.show()
# # mostrar_img(array_img_base)




# # bibliotecas usadas
import numpy
# from PIL import Image
# import random

# # variáveis
# cromossomo = []

# # carrega a imagem e transforma ela em um uma matriz 64x64 (tamanho da imagem)
# # cada posição da matriz representa um pixel da imagem (sua cor [entre 0 e 255 {escala de cinza}])
# img_base = Image.open('teste3.jpg').convert('L') # converte pra cinza pra facilitar o processamento
# array_img_base = numpy.array(img_base) # representação (definição do indivíduo)


teste = [102.2, 321.4, 222.5, 215.29]
dif = numpy.diff(teste)
print(dif)
print(abs(numpy.mean(dif[dif < 0])))