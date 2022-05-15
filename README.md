Introducere
	Cloud Computing a evoluat și s-a dezvoltat rapid în ultimii ani, majoritatea firmelor de pe piață utilizând serviciile de Cloud.
	În aplicația pe care am creat-o, am folosit două servicii cloud: Heroku – pentru a face deploy la aplicație și serviciul de SQL de la Google Cloud, pentru a crea o bază de date cu o tabelă. API-ul REST folosit a fost Cloud Natural Language API, tot de la Google Cloud.
	Scopul aplicației este acela de a putea trimite și examina mail-uri, având în partea de front a programului câmpuri atât pentru numele expeditorului, adresa destinatarului și mesajul care se dorește a fi primit, apoi stocarea acestora în baza de date creată cu ajutorul MySQL. Baza de date conține doar un tabel, cu următoarele câmpuri:
•	entryID – id-ul mail-ului, care este incrementat automat
•	senderName – numele expeditorului
•	senderMail – adresa de mail care trimite mesajul. Trimiterea mail-urilor a fost realizată cu ajutorul aplciației SendGrid. Adresa de mail din tabelă rămâne mereu aceeasi, adresa contului meu de student
•	receiverMail – mail-ul destinatarului
•	messageContent – mesajul pe care dorim să-l trimitem
•	Score – scorul sentimentului, care se află între (-1,1). -1 reprezentând sentimentele negative și 1 sentimentele pozitive. 
•	Magnitude – magnitudinea sentimentului, care se află între 0 și infinit. Aceasta reprezintă cât de puternic a fost sentimentul unui mesaj. De exemplu, cu cât un mesaj este mai personal sau mai lung, magnitudinea va fi mult mai mare în comparație cu un mesaj mai obiectiv și scurt.

![image](https://user-images.githubusercontent.com/65541409/168486578-afc640ad-9837-405e-b2f9-3648824e3a02.png)

 
Examinarea mail-urilor se face cu ajutorul Cloud Natural Language API, care prin analiza de text folosind tehnici de ML, algoritmi de extracție și NLU (natural language understanding), reușește să redea scorul și magnitudinea sentimentelor unui mesaj. Acestea sunt foarte folositoare în analize, pentru a urmări, de exemplu, părerile consumatorilor legate de un anumit produs.

![image](https://user-images.githubusercontent.com/65541409/168486603-ad3b00ab-d0f7-4ae2-ba4b-20d8fe4bd316.png)

 
	În Postman am realizat câteva exemple de HTTP request: Get all messages – prin care vedem toate mesajele din baza de date (cu ajutorul lui GET).
  
  ![image](https://user-images.githubusercontent.com/65541409/168486610-025b1a1a-28d0-46b0-b065-df7d449b44e4.png)

 
	Get 1 message by id (cu ajutorul lui GET): în care introducem id-ul mesajului pe care dorim să-l vedem:
  
  ![image](https://user-images.githubusercontent.com/65541409/168486614-c77787cc-86bc-41d6-98a1-523a489c0c3e.png)

 

	Alte HTTP request: ștergerea mesajelor (DEL), inserare (POST), update (PUT).

	În Heroku, pentru partea de frontend am creat gentle-sea-43562, iar pentru backend tranquil-beach-76759. 
  
  ![image](https://user-images.githubusercontent.com/65541409/168486618-18658fe0-c9ad-41b0-a78c-8579ee64eef8.png)

 
	În stânga avem și lista mesajelor care au fost trasmise anterior. Atunci când se apasă butonul de trimitere, se va afișa și un mesaj pe ecran cu ”Mesajul a fost trimis”.
  
 ![image](https://user-images.githubusercontent.com/65541409/168486621-d5c8d59d-7b5b-4fbb-a775-fdb9142817e1.png)


	LINK APLICAȚIE HEROKU: https://gentle-sea-43562.herokuapp.com
	LINK VIDEO: https://www.youtube.com/watch?v=5iI9Ya6Vzq8
	LINK GIT FRONTEND: https://github.com/iuliabrezoi/cloudcomputing-frontend
	LINK GIT BACKEND: https://github.com/iuliabrezoi/CloudComputing-Backend
	LINK DOCUMENTATIE: https://cloud.google.com/natural-language/docs/reference/rest
