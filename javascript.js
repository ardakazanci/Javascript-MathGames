/**
 * Created by ardakazanci on 5.02.2017.
 */


var oyun = false;
var skor;
var aksiyon;
var zamanBelirteci;
var soruCevap;


// Yeni Oyun - Yeniden Başlat

document.getElementById("oyunBaslatSifirla").onclick = function () {


    if (oyun == true) {     // Başlayan oyunu sıfırla.


        location.reload(); // Sayfayı yeniden yükler.


    } else {               // Yeni Oyun Başlatır.

        oyun = true;

        skor = 0;          // Skor ilk değer 1


        document.getElementById("degerSkor").innerHTML = skor; // Skor tablosuna değer set et.


        goster("zamanBelirteci"); // Sayacı gizlilikten çıkardı. Gösterdi.

        zamanBelirteci = 60; // İlk verilen zaman // ZamanBelirteci kutusunun içine 60 yazıyor.

        document.getElementById("zamanBelirteciDeger").innerHTML = zamanBelirteci;


        gizle("gameOver"); // Oyun bittikten sonra yeniden başlat dediğimizde sonuç ekranının gizlenmesi için.


        document.getElementById("oyunBaslatSifirla").innerHTML = "Yeniden Başlat";

        // Yeni oyun başlayacağı için , süre başlayacak .

        zamanlamaBaslat();

        // Yeni oyun başlayacağı için , soru gelecek.

        soruSecenekUret();
    }


}


// Cevap Doğruluğu - Skor artışı


for (i = 1; i < 5; i++) {

    document.getElementById("kutu" + i).onclick = function () {

        // Oynuyor muyuz ?

        if (oyun == true) {

            if (this.innerHTML == soruCevap) {

                skor++;

                document.getElementById("degerSkor").innerHTML = skor;

                gizle("yanlisCevap");

                goster("dogruCevap");

                setTimeout(function () {

                    gizle("dogruCevap");

                }, 1000);

                soruSecenekUret();

            } else {


                gizle("dogruCevap");
                goster("yanlisCevap");
                setTimeout(function () {


                    gizle("yanlisCevap");
                }, 1000);

            }

        }

    }


}

// Zaman Başlat - Fonksiyon

function zamanlamaBaslat() {

    aksiyon = setInterval(function () {

        zamanBelirteci -= 1;

        document.getElementById("zamanBelirteciDeger").innerHTML = zamanBelirteci;

        if (zamanBelirteci == 0) {

            zamanlamaSifirla(); // ZamanBelirteci 0 olduğunda , süreyi sıfırla ve sonuç ekranını göster.

            goster("gameOver"); // Sonuç sayfasını göster.

            document.getElementById("gameOver").innerHTML = "<p> Oyun Bitti!  </p><p> Toplam Skor " + skor + ".</p>";


            gizle("zamanBelirteci");
            gizle("dogruCevap");
            gizle("yanlisCevap");
            oyun = false;

            document.getElementById("oyunBaslatSifirla").innerHTML = "Oyun Başlat";
        }


    }, 1000)

}

// Zaman Sıfırla - Fonksiyon

function zamanlamaSifirla() {

    clearInterval(aksiyon);

}

// Element Gizle - Fonksiyon

function gizle(Id) {


    document.getElementById(Id).style.display = "none";

}

// Element Göster - Fonksiyon

function goster(Id) {


    document.getElementById(Id).style.display = "block";

}

// Soru Seçenek Üret - Fonksiyon

function soruSecenekUret() {


    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    soruCevap = x * y;

    var secimPozisyon = 1 + Math.round(3 * Math.random());

    document.getElementById("soruKisim").innerHTML = x + "x" + y;

    document.getElementById("kutu" + secimPozisyon).innerHTML = soruCevap; // Doğru Şık


    var cevaplar = [soruCevap]; // push ile yanlış cevap buraya eklenecek.


    for (i = 1; i < 5; i++) {

        if (i != secimPozisyon) {

            var yanlisCevap;

            do {

                yanlisCevap = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));


            } while (cevaplar.indexOf(yanlisCevap) > -1); // IndexOf () yöntemi, bir dizede belirtilen bir değerin ilk bulunduğu konumunu döndürür. Bu yöntem, aranacak değer asla oluşmazsa, -1 döndürür.


            document.getElementById("kutu" + i).innerHTML = yanlisCevap;

            cevaplar.push(yanlisCevap); // Push () yöntemi, bir dizinin sonuna yeni öğeler ekler ve yeni uzunluğu döndürür. Not: Yeni Ürün (ler) dizinin sonuna eklenecektir.


        }

    }

}

