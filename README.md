taskmanagement :

Application de Gestion de tâches - TP Final

Collaborateurs :
 - Mathurel Bryan : Pyhrrah
 - TEELUCK Rohan : RoroMarmotte
 - ZREIK Abane : LananasBTW
 - HUANG Jumet : jucyc

Ajout de rules sur les branch prod et dev :
-   Action github via branch protection rules pour prod et rules/ruleset pour dev
-   Les rules "Require a pull request before merging" et "Block force pushes" sont activer pour les deux branches
-   Activation du requirement status check to pass before merging en ajoutant les tests front, back et node



Ajout du workflow github :
-   Creation du fichier .github/workflows/ci.yml pour la CI
-   Modification du fichier CI pour les settings/installations du workflow github
-   Modification du CI pour que les tests nodes soient correctes et passent
-   Ajout des tests front et back

Les problèmes lors de l'installation eslint :
-   conflits entre les modules avec la version 10, donc nous avons opté pour la version 9
-   error Parsing error : 'import' and 'export' may appear only with 'sourceType:Module', nous avons modifié le fichier de configuration eslint pour qu'il lise correctement le langage respectif de chaque fichier.
-   Rohan problème github pour récupérer les branches distantes

Creation de tests unitaire pour le backend (APIs)
Creation de tests unitaire pour le frontend
