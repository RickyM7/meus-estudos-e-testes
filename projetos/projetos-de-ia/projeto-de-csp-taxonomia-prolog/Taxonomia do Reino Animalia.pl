% FATOS
% reino - filo
reino(animalia, chordata).
reino(animalia, arthropoda).
reino(animalia, porifera).
% filo - classe
filo(chordata, mammalia).
filo(chordata, aves).
filo(chordata, reptilia).
filo(chordata, actinopterygii).
filo(arthropoda, insecta).
filo(porifera, demospongiae).
% classe - ordem
classe(mammalia, carnivora).
classe(mammalia, artiodactyla).
classe(mammalia, perissodactyla).
classe(mammalia, cetacea).
classe(aves, sphenisciformes).
classe(reptilia, crocodylia).
classe(reptilia, squamata).
classe(actinopterygii, perciformes).
classe(insecta, lepidoptera).
classe(demospongiae).
% ordem - subordem
subordem(carnivora).
subordem(artiodactyla).
subordem(perissodactyla).
subordem(cetacea).
subordem(sphenisciformes).
subordem(crocodylia).
subordem(perciformes).
subordem(lepidoptera).
subordem(squamata, serpentes).
% ordem - família
ordem(carnivora, felidae).
ordem(carnivora, canidae).
ordem(artiodactyla, elephantidae).
ordem(artiodactyla, giraffidae).
ordem(artiodactyla, equidae).
ordem(perissodactyla, rhinocerotidae).
ordem(cetacea, delphinidae).
ordem(cetacea, balaenopteridae).
ordem(sphenisciformes, spheniscidae).
ordem(crocodylia, crocodylidae).
ordem(perciformes, pomacentridae).
ordem(lepidoptera, lepidoptera).
ordem(squamata).
% subordem - animal
soanimal(serpentes, cobra).
% familia - animal
familia(felidae, gato).
familia(felidae, leao).
familia(felidae, tigre).
familia(canidae, cao).
familia(elephantidae, elefante).
familia(giraffidae, girafa).
familia(equidae, cavalo).
familia(rhinocerotidae, rinoceronte).
familia(delphinidae, golfinho).
familia(balaenopteridae, baleia).
familia(spheniscidae, pinguim).
familia(crocodylidae, crocodilo).
familia(crocodylidae, jacare).
familia(pomacentridae, peixe-palhaco).
familia(lepidoptera, borboleta).
familia(spongidae, esponja).
% REGRAS
% reino
filos_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						format('Filos do reino ~w: ~w~n', [Reino, Filos]).
classes_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						  findall(Classe, (member(Filo, Filos), filo(Filo, Classe)), Classes),
						  format('Classes do reino ~w: ~w~n', [Reino, Classes]).
ordens_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						 findall(Classe, (member(Filo, Filos), filo(Filo, Classe)), Classes),
						 findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
						 format('Ordens do reino ~w: ~w~n', [Reino, Ordens]).
subordens_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						 	findall(Classe, (member(Filo, Filos), filo(Filo, Classe)), Classes),
						 	findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
						 	findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
						 	format('Subordens do reino ~w: ~w~n', [Reino, Subordens]).
familias_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						   findall(Classe, (member(Filo, Filos), filo(Filo, Classe)), Classes),
						   findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
						   findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias),
						   format('Familias do reino ~w: ~w~n', [Reino, Familias]).
animais_do_reino(Reino):- findall(Filo, reino(Reino, Filo), Filos),
						  findall(Classe, (member(Filo, Filos), filo(Filo, Classe)), Classes),
						  findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
						  findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
						  findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias),
						  findall(Soanimal, (member(Subordem, Subordens), soanimal(Subordem, Soanimal)), Soanimais),
						  findall(Fanimal, (member(Familia, Familias), familia(Familia, Fanimal)), Fanimais),
						  append(Soanimais, Fanimais, Animais),
						  format('Animais do reino ~w: ~w~n', [Reino, Animais]).
% filo
reino_do_filo(Filo):- reino(Reino, Filo),
					  format('Reino do filo ~w: ~w~n', [Filo, Reino]).
classes_do_filo(Filo):- findall(Classe, filo(Filo, Classe), Classes),
						format('Classes do filo ~w: ~w~n', [Filo, Classes]).
ordens_do_filo(Filo):- findall(Classe, filo(Filo, Classe), Classes),
					   findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
					   format('Ordens do filo ~w: ~w~n', [Filo, Ordens]).
subordens_do_filo(Filo):- findall(Classe, filo(Filo, Classe), Classes),
						  findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
					      findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
					      format('Subordens do filo ~w: ~w~n', [Filo, Subordens]).
familias_do_filo(Filo):- (Filo == porifera
                         ->  Familias = [spongiae]
                         ;
                         findall(Classe, filo(Filo, Classe), Classes),
						 findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
					     findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias)
                         ),
					     format('Familias do filo ~w: ~w~n', [Filo, Familias]).
animais_do_filo(Filo):- (Filo == porifera
                         ->  Animais = [esponja]
                         ;
                        findall(Classe, filo(Filo, Classe), Classes),
						findall(Ordem, (member(Classe, Classes), classe(Classe, Ordem)), Ordens),
						findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
					    findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias),
					    findall(Soanimal, (member(Subordem, Subordens), soanimal(Subordem, Soanimal)), Soanimais),
						findall(Fanimal, (member(Familia, Familias), familia(Familia, Fanimal)), Fanimais),
						append(Soanimais, Fanimais, Animais)),
					    format('Animais do filo ~w: ~w~n', [Filo, Animais]).
% classe
reino_da_classe(Classe):- reino(Reino, Filo),
						  filo(Filo, Classe),
						  format('Reino da classe ~w: ~w~n', [Classe, Reino]), !.
filo_da_classe(Classe):- filo(Filo, Classe),
						 format('Filo da classe ~w: ~w~n', [Classe, Filo]).
ordens_da_classe(Classe):- findall(Ordem, classe(Classe, Ordem), Ordens),
					   	   format('Ordens da classe ~w: ~w~n', [Classe, Ordens]).
subordens_da_classe(Classe):- findall(Ordem, classe(Classe, Ordem), Ordens),
					      	  findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
					      	  format('Subordens da classe ~w: ~w~n', [Classe, Subordens]).
familias_da_classe(Classe):- (Classe == demospongiae
                         	 ->  Familias = [spongiae]
                         	 ;
                             findall(Ordem, classe(Classe, Ordem), Ordens),
					     	 findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias)),
					     	 format('Familias da classe ~w: ~w~n', [Classe, Familias]).
animais_da_classe(Classe):- (Classe == demospongiae
                            ->  Animais = [esponja]
                            ;
                            findall(Ordem, classe(Classe, Ordem), Ordens),
							findall(Subordem, (member(Ordem, Ordens), subordem(Ordem, Subordem)), Subordens),
					    	findall(Familia, (member(Ordem, Ordens), ordem(Ordem, Familia)), Familias),
					    	findall(Soanimal, (member(Subordem, Subordens), soanimal(Subordem, Soanimal)), Soanimais),
							findall(Fanimal, (member(Familia, Familias), familia(Familia, Fanimal)), Fanimais),
							append(Soanimais, Fanimais, Animais)),
					    	format('Animais da classe ~w: ~w~n', [Classe, Animais]).
% ordem
reino_da_ordem(Ordem):- reino(Reino, Filo),
						filo(Filo, Classe),
						classe(Classe, Ordem),
						format('Reino da ordem ~w: ~w~n', [Ordem, Reino]), !.
filo_da_ordem(Ordem):- filo(Filo, Classe),
					   classe(Classe, Ordem),
					   format('Filo da ordem ~w: ~w~n', [Ordem, Filo]), !.
classe_da_ordem(Ordem):- classe(Classe, Ordem),
					   	 format('Classe da ordem ~w: ~w~n', [Ordem, Classe]).
subordens_da_ordem(Ordem):- findall(Subordem, subordem(Ordem, Subordem), Subordens),
					      	  format('Subordens da ordem ~w: ~w~n', [Ordem, Subordens]).
familias_da_ordem(Ordem):- findall(Familia, ordem(Ordem, Familia), Familias),
					     	 format('Familias da ordem ~w: ~w~n', [Ordem, Familias]).
animais_da_ordem(Ordem):- findall(Subordem, subordem(Ordem, Subordem), Subordens),
				    	  findall(Familia, ordem(Ordem, Familia), Familias),
				    	  findall(Soanimal, (member(Subordem, Subordens), soanimal(Subordem, Soanimal)), Soanimais),
						  findall(Fanimal, (member(Familia, Familias), familia(Familia, Fanimal)), Fanimais),
						  append(Soanimais, Fanimais, Animais),
				    	  format('Animais da ordem ~w: ~w~n', [Ordem, Animais]).
% subordem
reino_da_subordem(Subordem):- reino(Reino, Filo),
						      filo(Filo, Classe),
						      classe(Classe, Ordem),
						      subordem(Ordem, Subordem),
						      format('Reino da subordem ~w: ~w~n', [Subordem, Reino]), !.
filo_da_subordem(Subordem):- filo(Filo, Classe),
					   		 classe(Classe, Ordem),
					   		 subordem(Ordem, Subordem),
					   		 format('Filo da subordem ~w: ~w~n', [Subordem, Filo]), !.
classe_da_subordem(Subordem):- classe(Classe, Ordem),
					   		   subordem(Ordem, Subordem),
					   	 	   format('Classe da subordem ~w: ~w~n', [Subordem, Classe]), !.
ordem_da_subordem(Subordem):- subordem(Ordem, Subordem),
					   	 	  format('Ordem da subordem ~w: ~w~n', [Subordem, Ordem]).
animais_da_subordem(Subordem):- findall(Soanimal, soanimal(Subordem, Soanimal), Soanimais),
				    	  		format('Animais da subordem ~w: ~w~n', [Subordem, Soanimais]).
% familia
reino_da_familia(Familia):- (Familia == spongidae
                            ->  Reino = animalia
                            ;   
                            reino(Reino, Filo),
						    filo(Filo, Classe),
						    classe(Classe, Ordem),
						    ordem(Ordem, Familia)),
						    format('Reino da familia ~w: ~w~n', [Familia, Reino]), !.
filo_da_familia(Familia):- (Familia == spongidae
                           ->  Filo = porifera
                           ;   
                           filo(Filo, Classe),
					   	   classe(Classe, Ordem),
					   	   ordem(Ordem, Familia)),
					   	   format('Filo da familia ~w: ~w~n', [Familia, Filo]), !.
classe_da_familia(Familia):- (Familia == spongidae
                             ->  Classe = demospongiae
                             ;
                             classe(Classe, Ordem),
					   		 ordem(Ordem, Familia)),
					   	 	 format('Classe da familia ~w: ~w~n', [Familia, Classe]), !.
ordem_da_familia(Familia):- ordem(Ordem, Familia),
					   	 	format('Ordem da familia ~w: ~w~n', [Familia, Ordem]).
animais_da_familia(Familia):- findall(Fanimal, familia(Familia, Fanimal), Fanimais),
				    	  	  format('Animais da familia ~w: ~w~n', [Familia, Fanimais]).
% animal
reino_do_animal(Animal):- (Animal == esponja
						  -> Reino = animalia
						  ;
						  reino(Reino, Filo),
						  filo(Filo, Classe),
						  classe(Classe, Ordem),
						  (ordem(Ordem, Familia),
						  familia(Familia, Animal)
						  ;
						  subordem(Ordem, Subordem),
						  soanimal(Subordem, Animal))
						  ),
						  format('Reino do animal ~w: ~w~n', [Animal, Reino]), !.
filo_do_animal(Animal):- (Animal == esponja
						  -> Filo = porifera
						  ;
						 filo(Filo, Classe),
					   	 classe(Classe, Ordem),
					   	 (ordem(Ordem, Familia),
						 familia(Familia, Animal)
						 ;
						 subordem(Ordem, Subordem),
						 soanimal(Subordem, Animal))
						 ),
					   	 format('Filo do animal ~w: ~w~n', [Animal, Filo]), !.
classe_do_animal(Animal):- (Animal == esponja
						   -> Classe = demospongiae
						   ;
						   classe(Classe, Ordem),
					   	   (ordem(Ordem, Familia),
						   familia(Familia, Animal)
						   ;
						   subordem(Ordem, Subordem),
						   soanimal(Subordem, Animal))
						   ),
					   	   format('Classe do animal ~w: ~w~n', [Animal, Classe]), !.
ordem_do_animal(Animal):- (ordem(Ordem, Familia),
						  familia(Familia, Animal)
					   	  ;
					   	  subordem(Ordem, Subordem),
					   	  soanimal(Subordem, Animal)),
					   	  format('Ordem do animal ~w: ~w~n', [Animal, Ordem]), !.
subordem_do_animal(Animal):- soanimal(Subordem, Animal),
					   	   	 format('Subordem do animal ~w: ~w~n', [Animal, Subordem]).
familia_do_animal(Animal):- familia(Familia, Animal),
					   	    format('Familia do animal ~w: ~w~n', [Animal, Familia]).
