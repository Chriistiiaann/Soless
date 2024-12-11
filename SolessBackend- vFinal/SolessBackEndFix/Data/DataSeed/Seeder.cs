using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SolessBackend.Data;
using SolessBackend.Interfaces;
using SolessBackend.Models;
using SolessBackEndFix.Models;

namespace SolessBackEndFix.Data.Seeder;

public class Seeder
{
    private readonly DataBaseContext _context;
    private readonly IPasswordHasher _passwordHasher;
    public Seeder(DataBaseContext context, IPasswordHasher hashed)
    {
        _context = context;
        _passwordHasher = hashed;
    }

    public void Seed()
    {
        string passwordHashedChristian = _passwordHasher.Hash("Christian123.");
        string passwordHashedKilian = _passwordHasher.Hash("Kilian123.");
        string passwordHashedJosemi = _passwordHasher.Hash("Josemi123.");
        string passwordHashedJuanjo = _passwordHasher.Hash("Juanjo123.");
        string passwordHashedJose = _passwordHasher.Hash("Jose123.");
        string passwordHashedPruebas = _passwordHasher.Hash("Pruebas123.");



        User[] users =
        {
            new User
                {
                    Id = 0,
                    Name = "Christian",
                    Email = "christian@gmail.com",
                    Password = passwordHashedChristian,
                    Role = "admin",
                    Address = "Calle Christian",
                    Cart = new Cart
                    {
                        Id = 0, 
                        UserId = 0 
                    }
                },
            new User
                {
                    Id = 0,
                    Name = "Kilian",
                    Email = "kilian@gmail.com",
                    Password = passwordHashedKilian,
                    Role = "admin",
                    Address = "Calle Kilian",
                    Cart = new Cart
                    {
                        Id = 0,
                        UserId = 0
                    }
                },
            new User
                {
                    Id = 0,
                    Name = "Josemi",
                    Email = "josemi@gmail.com",
                    Password = passwordHashedJosemi,
                    Role = "admin",
                    Address = "Calle Josemi",
                    Cart = new Cart
                    {
                        Id = 0, 
                        UserId = 0 
                    }
                },
            new User
                {
                    Id = 0,
                    Name = "Juanjo",
                    Email = "juanjo@gmail.com",
                    Password = passwordHashedJuanjo,
                    Role = "admin",
                    Address = "Calle Juanjo",
                    Cart = new Cart
                    {
                        Id = 0,
                        UserId = 0 
                    }
                },
            new User
            {
                    Id = 0,
                    Name = "José",
                    Email = "jose@gmail.com",
                    Password = passwordHashedJose,
                    Role = "admin",
                    Address = "Calle jose",
                    Cart = new Cart
                    {
                        Id = 0, 
                        UserId = 0 
                    }
            },
            new User
            {
                    Id = 0,
                    Name = "Pruebas",
                    Email = "pruebas@gmail.com",
                    Password = passwordHashedPruebas,
                    Role = "none",
                    Address = "Calle pruebas",
                    Cart = new Cart
                    {
                        Id = 0,
                        UserId = 0
                    }
            }
        };

        Product[] products = 
        {
            new Product
            {
                Id = 0,
                Brand = "Golden Goose",
                Model = "zapatillas Super-Star",
                Original_Price = 480,
                Discount_Price = 0,
                Stock = 12,
                Img_Name = "zapatillas Super-Star.jpg",
                Description = "Blanco natural, gris suave, cuero de becerro, acabado envejecido, paneles de gamuza en contraste, icónica estrella lateral en relieve, logotipo estampado en el costado, lengüeta con detalle de logo, cierre frontal con cordones, puntera redondeada y perforada para una mayor transpirabilidad, talón con logotipo en contraste, plantilla de piel con marca estampada, forro de algodón suave, y suela plana de goma duradera. Este modelo incluye certificado de autenticidad y viene presentado en una bolsa protectora para su almacenamiento.",
                Composition = "Exterior: Piel de búfalo 100%\nForro: Algodón 100%, Piel de becerro 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Nike",
                Model = "zapatillas SB Dunk Travis Scott Special Box",
                Original_Price = 2682,
                Discount_Price = 2400,
                Stock = 15,
                Img_Name = "zapatillas SB Dunk Travis Scott Special Box.jpg",
                Description = "Puntera redonda, suela plana de goma, cierre con cordones en la parte delantera y plantilla con logo. Estos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.",
                Composition = "Exterior: Cuero 100%, poliéster 100%\nForro: poliéster 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Amiri",
                Model = "zapatillas MA-1",
                Original_Price = 766,
                Discount_Price = 766,
                Stock = 23,
                Img_Name = "zapatillas MA-1.jpg",
                Description = "Con diseño inspirado en la clásica chaqueta bomber, estos zapatos presentan una combinación de materiales en nylon duradero y detalles en cuero, disponibles en tonos verde militar y negro. El interior en color naranja añade un contraste distintivo, mientras que una cremallera lateral facilita el calce y refuerza su estilo utilitario. La suela de goma antideslizante y la plantilla acolchada ofrecen confort y estabilidad. Con el logo en el talón, este zapato une elegancia y funcionalidad para un look urbano refinado.",
                Composition = "Exterior: Piel de becerro 100%, Ante de becerro 100%, Otros tejidos 100%\nForro: Otros tejidos 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Off-White",
                Model = "zapatillas Slim Out Of Office",
                Original_Price = 450,
                Discount_Price = 420,
                Stock = 12,
                Img_Name = "zapatillas Slim Out Of Office.jpg",
                Description = "Zapatillas Slim Out Of Office en tonos blanco y gris suave, confeccionadas en cuero de alta calidad con paneles en gamuza para un toque elegante y moderno. Diseño estilizado y aerodinámico, ideal para el uso diario, con el icónico logo de flecha en relieve en el lateral. Cierre con cordones en la parte frontal, puntera redondeada y perforada para mayor transpirabilidad, y cuello acolchado para un ajuste cómodo. Plantilla de piel con logotipo estampado y forro interior suave para una sensación premium. Suela de goma ligera y flexible que proporciona un excelente agarre en cada paso. Perfectas para un look casual y sofisticado, estas zapatillas son el complemento ideal para cualquier guardarropa.",
                Composition = "Exterior: Cuero 53%, Poliéster reciclado 47%\nForro: Poliéster reciclado 82%, poliéster 18%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Nike",
                Model = "zapatillas SB Dunk Low Verdy Visty",
                Original_Price = 652,
                Discount_Price = 630,
                Stock = 30,
                Img_Name = "zapatillas SB Dunk Low Verdy Visty.jpg",
                Description = "Con un diseño vibrante y distintivo, las SB Dunk Low Verdy Visty presentan una mezcla de colores llamativos y materiales premium que capturan el estilo único de la colaboración con Verdy. La parte superior combina paneles de gamuza y cuero en tonos negros, blancos y rojos, con detalles gráficos y el icónico logo de Verdy en los laterales. La puntera perforada mejora la transpirabilidad, mientras que el cuello acolchado proporciona comodidad durante todo el día. Cierre con cordones en contraste, suela de goma antideslizante para un excelente agarre, y plantilla con estampado personalizado que añade un toque especial. Estas zapatillas son ideales para los amantes del streetwear y de las colaboraciones exclusivas, fusionando la esencia del skate con el arte urbano.",
                Composition = "Exterior: Ante de becerro 100%, Otros tejidos 100%, Piel de becerro 100%\nForro: Otros tejidos 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Fendi",
                Model = "zapatillas Match",
                Original_Price = 704,
                Discount_Price = 704,
                Stock = 27,
                Img_Name = "zapatillas Match.jpg",
                Description = "Con diseño inspirado en la clásica chaqueta bomber, estos zapatos presentan una combinación de materiales en nylon duradero y detalles en cuero, disponibles en tonos verde militar y negro. El interior en color naranja añade un contraste distintivo, mientras que una cremallera lateral facilita el calce y refuerza su estilo utilitario. La suela de goma antideslizante y la plantilla acolchada ofrecen confort y estabilidad. Con el logo en el talón, este zapato une elegancia y funcionalidad para un look urbano refinado.",
                Composition = "Exterior: Otros tejidos 100%, Piel de becerro 100%\nForro: poliéster 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Jordan",
                Model = "zapatillas Air Jordan 4 Retro 'Military Black'",
                Original_Price = 424,
                Discount_Price = 424,
                Stock = 42,
                Img_Name = "zapatillas Air Jordan 4 Retro Military Black.jpg",
                Description = "Este artículo proviene de una marca calificada como tres de cinco («Es un inicio») por Good on You. Por favor, ten en cuenta que esta es una valoración a nivel de marca y no garantiza que este producto esté elaborado con materiales responsables. Descubre más sobre qué hace que un producto sea conscious en nuestra página de Criterios conscious.",
                Composition = "Exterior: Cuero 100%\nForro: nylon 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Nike",
                Model = "zapatillas 1 de Nike x Cactus Plant Flea Market",
                Original_Price = 965,
                Discount_Price = 965,
                Stock = 15,
                Img_Name = "zapatillas 1 de Nike x Cactus Plant Flea Market.jpg",
                Description = "Verde, puntera redonda, detalle de pelo artificial, cierre con cordones en la parte delantera, logo bordado en la lengüeta, lengüeta en la parte posterior, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.",
                Composition = "Exterior: Otros tejidos 100%\nSuela: Goma 100%\nForro: Otros tejidos 100%"
            },
            new Product //editar
            {
                Id = 0,
                Brand = "Rick Owens",
                Model = "zapatillas acolchadas Jumbolaced",
                Original_Price = 2356,
                Discount_Price = 2356,
                Stock = 6,
                Img_Name = "zapatillas acolchadas Jumbolaced.jpg",
                Description = "Las zapatillas acolchadas Jumbolaced ofrecen un equilibrio perfecto entre comodidad y estilo. Con un diseño moderno y cordones extra gruesos que destacan, brindan un ajuste seguro y personalizado. Su suela de goma antideslizante proporciona estabilidad en cualquier superficie, mientras que su acolchado de alta densidad garantiza una sensación de suavidad y confort durante todo el día. Ideales para quienes buscan un calzado versátil, cómodo y con un toque único en su diseño. Definitivamente la Nil Ojdea type Shoe.",
                Composition = "Exterior: Cuero 100%\nSuela: Goma 100%\nForro: Cuero 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Off-White",
                Model = "zapatillas Out Of Office For Walking",
                Original_Price = 490,
                Discount_Price = 490,
                Stock = 33,
                Img_Name = "zapatillas Out Of Office For Walking.jpg",
                Description = "Blanco óptico, negro y detalles en gris suave, confeccionadas en piel de becerro y material textil de alta calidad, con textura suave. Diseño elegante y moderno, con paneles de ante que añaden un toque de sofisticación. Logotipo de flecha distintivo estampado en el lateral, lengüeta con logo grabado, y cierre con cordones en la parte delantera para un ajuste seguro. Puntera redonda y perforada que favorece la transpirabilidad, logo en contraste en el contrafuerte, plantilla de piel con logotipo para mayor confort, forro de satén suave y suela plana de goma que proporciona durabilidad y tracción. Este producto incluye certificado de autenticidad y se presenta en una bolsa de protección, ideal para mantener tus zapatillas en perfecto estado.",
                Composition = "Exterior: Cuero 89%, Poliéster reciclado 11%\nForro: Poliéster reciclado 82%, poliéster 18%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Golden Goose",
                Model = "zapatillas Stardan",
                Original_Price = 510,
                Discount_Price = 510,
                Stock = 14,
                Img_Name = "zapatillas Stardan.jpg",
                Description = "Las zapatillas Stardan combinan una estética retro con detalles modernos para un look urbano inconfundible. Inspiradas en el diseño clásico de los años 80, cuentan con una construcción robusta y materiales de alta calidad que garantizan durabilidad y comodidad. Su suela de goma texturizada proporciona tracción y estabilidad, mientras que los detalles desgastados y los contrastes de color añaden un toque de estilo vintage auténtico. Perfectas para quienes buscan destacar con un calzado que equilibre nostalgia y tendencias actuales.",
                Composition = "Exterior: Ante de Becerro 100%\nForro:Algodón 44%, Piel de becerro 25%, poliuretano 20%, poliéster 6%, Viscosa 5%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Jordan",
                Model = "zapatillas The 10 Air Jordan 1 de Nike x Off-White",
                Original_Price = 8103,
                Discount_Price = 8103,
                Stock = 43,
                Img_Name = "zapatillas The 10 Air Jordan 1 de Nike x Off-White.jpg",
                Description = "Blanco óptico con detalles en naranja, negro y azul, estas zapatillas destacan por su diseño distintivo y vanguardista. Confeccionadas en una combinación de cuero premium y tejido sintético, presentan una silueta icónica que rinde homenaje al clásico Air Jordan 1. Elementos característicos de Off-White, como el logotipo en forma de comillas, costuras expuestas y etiquetas en colores vibrantes, aportan un toque contemporáneo y artístico. Cierre con cordones en la parte delantera y una lengüeta acolchada que proporciona confort y soporte. La puntera perforada permite la transpirabilidad, mientras que la suela de goma de alta calidad asegura durabilidad y agarre. Estas zapatillas son una declaración de estilo, perfectas para los amantes del streetwear y coleccionistas, y vienen con su certificado de autenticidad en una presentación especial.",
                Composition = "Exterior: Cuero 100%, ante 100%\nForro: poliéster 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Fendi",
                Model = "zapatillas Match sneakers",
                Original_Price = 773,
                Discount_Price = 773,
                Stock = 11,
                Img_Name = "zapatillas Match sneakers.jpg",
                Description = "Con diseño inspirado en la clásica chaqueta bomber, estos zapatos presentan una combinación de materiales en nylon duradero y detalles en cuero, disponibles en tonos verde militar y negro. El interior en color naranja añade un contraste distintivo, mientras que una cremallera lateral facilita el calce y refuerza su estilo utilitario. La suela de goma antideslizante y la plantilla acolchada ofrecen confort y estabilidad. Con el logo en el talón, este zapato une elegancia y funcionalidad para un look urbano refinado.",
                Composition = "Exterior: Piel de becerro 100%\nForro: Otros tejidos 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Adidas Yeezy",
                Model = "zapatillas Yeezy Boost 350 V2 'Zebra - 2018/2019 Release'",
                Original_Price = 609,
                Discount_Price = 609,
                Stock = 37,
                Img_Name = "zapatillas Yeezy Boost 350 V2 Zebra - 2018-2019 Release.jpg",
                Description = "Blanco puro y negro, estas zapatillas presentan un diseño distintivo y llamativo que captura la esencia de la colaboración entre Adidas y Kanye West. La parte superior está confeccionada en tejido Primeknit de alta calidad, con el icónico patrón de rayas que imita el pelaje de una cebra. Detalles como la banda lateral transparente en la parte media del pie, que muestra el texto 'SPLY-350' en rojo, añaden un toque de carácter. Cierre con cordones en la parte delantera, puntera redondeada y suela Boost que proporciona una amortiguación excepcional y comodidad durante todo el día. Forro interior suave y plantilla acolchada para una sensación premium en cada paso. Estas zapatillas son ideales para quienes buscan un estilo urbano único y una comodidad insuperable, y vienen con su certificado de autenticidad, presentadas en su caja original.",
                Composition = "Exterior: Algodón 100%\nForro: poliamida 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Converse",
                Model = "zapatillas altas Converse x Off-White Chuck 70",
                Original_Price = 2628,
                Discount_Price = 2628,
                Stock = 22,
                Img_Name = "zapatillas altas Converse x Off-White Chuck 70.jpg",
                Description = "Zapatillas altas Converse x Off-White Chuck 70 en lona de color blanco de Converse con puntera redonda, cierre con cordones en la parte delantera, diseño por el tobillo y suela de goma.",
                Composition = "Exterior: Lona 100%\nForro: Lona 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Converse",
                Model = "zapatillas Chuck 70 Hi de Converse x Isabel Marant",
                Original_Price = 152,
                Discount_Price = 152,
                Stock = 12,
                Img_Name = "zapatillas Chuck 70 Hi de Converse x Isabel Marant.jpg",
                Description = "Nos hemos asociado con Good On You, una agencia independiente que clasifica el desempeño de las marcas en relación con su impacto en el planeta, las personas y los animales, con una calificación multicriterio simplificada a una escala de cinco puntos. Para obtener nuestra etiqueta conscious, las marcas más grandes deben obtener una puntuación mínima de cuatro sobre cinco («Bueno»), mientras que las marcas más pequeñas deben obtener una puntuación mínima de tres sobre cinco («Es un inicio»). Este artículo proviene de una marca calificada como tres de cinco («Es un inicio») por Good on You. Por favor, ten en cuenta que esta es una valoración a nivel de marca y no garantiza que este producto esté elaborado con materiales responsables.",
                Composition = "Exterior: poliéster 100%, Algodón 100%\nSuela: Goma 100%\nForro: Otros tejidos 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Adidas",
                Model = "zapatillas Campus con cordones de adidas x Bad Bunny",
                Original_Price = 284,
                Discount_Price = 284,
                Stock = 12,
                Img_Name = "zapatillas Campus con cordones de adidas x Bad Bunny.jpg",
                Description = "Marrón café, cuero, ante, logo 3-Stripes característico, logo estampado en el lateral, parche del logo en la lengüeta, puntera redonda, cierre con cordones en la parte delantera, plantilla con logo y suela plana de goma. Estos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.",
                Composition = "Exterior: Piel de becerro 100%, Ante de becerro 100%\nForro: Otros tejidos 100%, Cuero 100%\nSuela: Goma 100%"
            },
            new Product
            {
                Id = 0,
                Brand = "Adidas",
                Model = "zapatillas x Bad Bunny x Lionel Messi Gazelle Indoor \"Cardboard\" sneakers",
                Original_Price = 413,
                Discount_Price = 413,
                Stock = 12,
                Img_Name = "zapatillas x Bad Bunny x Lionel Messi Gazelle Indoor Cardboard sneakers.jpg",
                Description = "cardboard/cream white/wild brown calf leather suede panelling front lace-up fastening logo print to the side signature 3-Stripes logo logo-print tongue perforated toebox round toe branded insole gum-rubber sole These styles are supplied by a premium and authenticated sneaker marketplace. Stocking only the most sought-after footwear, they source and curate some of the most hard to find sneakers from around the world.",
                Composition = "Exterior: Piel de becerro 100%\nForro: Otros tejidos 100%\nSuela: Goma 100%"
            }, 
            new Product 
            {
                  Id= 0,
                  Brand= "Crocs",
                  Model= "Sandalias Mules Classic Clog De MCM X Crocs",
                  Original_Price= 679,
                  Discount_Price= 679,
                  Stock= 12,
                  Img_Name= "Sandalias Mules Classic Clog De MCM X Crocs.jpg",
                  Description= "Beige arena, negro, detalle de abertura, placa del logo en tono plateado, puntera redonda, tira en la parte posterior y suela gruesa de goma.",
                  Composition= "Exterior= Goma 100%\nForro= Goma 100%\nSuela= Goma 100%"
            },
            new Product 
            {
                  Id= 0,
                  Brand= "Crocs",
                  Model= "Sandalias Con Logo En Relieve De BALENCIAGA X Crocs",
                  Original_Price= 556,
                  Discount_Price= 556,
                  Stock= 12,
                  Img_Name= "Sandalias Con Logo En Relieve De BALENCIAGA X Crocs.jpg",
                  Description= "Negro, logo en relieve en la parte delantera, detalle de perforaciones, puntera redonda, estilo slip-on y suela plana. Nos hemos asociado con Good On You, una agencia independiente que clasifica el desempeño de las marcas en relación con su impacto en el planeta, las personas y los animales, con una calificación multicriterio simplificada a una escala de cinco puntos. Para conseguir nuestra etiqueta conscious, las marcas más grandes deben obtener una puntuación mínima de cuatro sobre cinco («Bueno»), mientras que las marcas más pequeñas deben obtener una puntuación mínima de tres sobre cinco («Es un inicio»). Este artículo proviene de una marca con una puntuación de cuatro sobre cinco («Bueno») por Good on You. Por favor, ten en cuenta que esta es una valoración a nivel de marca y no garantiza que este producto esté elaborado con materiales responsables. Descubre más sobre qué hace que un producto sea conscious en nuestra página de Criterios conscious.",
                  Composition= "Exterior= Goma 100%\nSuela= Goma 100%\nForro= Otros tejidos 100%"
            },
            new Product 
            {
                  Id= 0,
                  Brand= "Nike",
                  Model= "Zapatillas Air Force 1 '07 PRM 3",
                  Original_Price= 1640,
                  Discount_Price= 1640,
                  Stock= 12,
                  Img_Name= "Zapatillas Air Force 1 '07 PRM 3.jpg",
                  Description= "Zapatillas Air Force 1 '07 PRM 3 de Nike con logo Nike, motivo floral, paneles pespunteados, parche del logo en la lengüeta, cierre con cordones en la parte delantera, puntera redonda y suela de goma. Estos estilos son suministrados por un marketplace de zapatillas premium que comercializa productos singulares, ya agotados y sin usar. Cada producto es rigurosamente inspeccionado por expertos que garantizan su autenticidad.",
                  Composition= "Exterior= Cuero 100%\nForro= nylon 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Jordan",
                  Model= "Zapatillas Air Jordan 4 Retro FK Sneakers",
                  Original_Price= 797,
                  Discount_Price= 797,
                  Stock= 12,
                  Img_Name= "Zapatillas Air Jordan 4 Retro FK Sneakers.jpg",
                  Description= "Las Air Jordan 4 Retro FK son una reedición moderna de uno de los modelos más emblemáticos de la línea Air Jordan. Estas zapatillas combinan la estructura clásica del modelo Jordan 4 con una parte superior en tejido Flyknit, que ofrece una mayor ligereza y transpirabilidad sin sacrificar el estilo. Presentan detalles icónicos como la jaula en los laterales y la suela con amortiguación Air, proporcionando comodidad y soporte para uso diario. Su diseño mezcla el legado de las Jordan con innovaciones contemporáneas, ideal para quienes buscan un look deportivo con toques modernos y vanguardistas.",
                  Composition= "Exterior= poliéster 100%\nForro= Cuero 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Amiri",
                  Model= "Zapatillas Skel-Top Sneakers",
                  Original_Price= 635,
                  Discount_Price= 635,
                  Stock= 12,
                  Img_Name= "Zapatillas Skel-Top Sneakers.jpg",
                  Description= "Las Skel-Top sneakers son unas zapatillas de diseño único que destacan por su llamativo motivo de esqueleto en los costados, simulando los huesos del pie. Este detalle gráfico, generalmente en contraste con el color de la zapatilla, le da un aspecto atrevido y creativo, ideal para quienes buscan un estilo fuera de lo común. La construcción combina materiales de alta calidad, como cuero y gamuza, que aportan durabilidad y confort. Su diseño versátil y urbano incluye una suela robusta que proporciona estabilidad y tracción. Estas zapatillas fusionan originalidad y funcionalidad, haciéndolas una pieza clave para cualquier colección de calzado.",
                  Composition= "Exterior= Piel de becerro 100%, Otros tejidos 100%\nForro= Otros tejidos 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Adidas Yeezy",
                  Model= "Zapatillas Yeezy 500 \"Utility Black\"",
                  Original_Price= 364,
                  Discount_Price= 364,
                  Stock= 12,
                  Img_Name= "Zapatillas Yeezy 500 Utility Black.jpg",
                  Description= "Las Yeezy 500 \"Utility Black\" son una versión elegante y robusta de la icónica colaboración entre Kanye West y adidas. Estas zapatillas presentan una silueta voluminosa y retro, combinada con un tono negro profundo que aporta versatilidad y estilo urbano. Su diseño está hecho con una mezcla de materiales de alta calidad, incluyendo gamuza, malla y cuero, que no solo añade textura sino también durabilidad. La suela incorpora la tecnología adiPRENE, brindando una amortiguación cómoda y soporte para uso prolongado. Estas zapatillas son perfectas para quienes buscan un look sofisticado y cómodo con una estética audaz y distintiva.",
                  Composition= "Exterior= Cuero 100%, poliéster 100%\nForro= poliamida 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Nike",
                  Model= "Zapatillas Air Max 1 “Sketch Schematic” Sneakers",
                  Original_Price= 306,
                  Discount_Price= 306,
                  Stock= 12,
                  Img_Name= "Zapatillas Air Max 1 Sketch Schematic Sneakers.jpg",
                  Description= "Zapatilla en color negro con logo en relieve en la parte frontal, detalle de perforaciones que añaden estilo y transpirabilidad, puntera redonda y diseño tipo slip-on para mayor comodidad. La suela es plana, perfecta para un estilo casual y versátil. Esta zapatilla pertenece a una marca evaluada por Good On You, una agencia independiente que mide el impacto de las marcas en el planeta, las personas y los animales. Con una calificación de cuatro sobre cinco (\"Bueno\"), este producto cumple con altos estándares éticos y sostenibles a nivel de marca, promoviendo prácticas conscientes en la industria de la moda. Para más detalles sobre nuestros criterios conscious, visita nuestra página de Criterios conscious.",
                  Composition= "Exterior= poliéster 100%, poliuretano 100%\nForro= poliéster 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Golden Goose",
                  Model= "Zapatillas Ballstar Con Parche De Estrella",
                  Original_Price= 480,
                  Discount_Price= 480,
                  Stock= 12,
                  Img_Name= "Zapatillas Ballstar Con Parche De Estrella.jpg",
                  Description= "Blanco óptico, gris claro, piel de becerro, textura granulada, paneles de ante, parche lateral de estrella característico, logo estampado en el lateral, lengüeta con logo estampado, cierre con cordones en la parte delantera, puntera redonda, puntera perforada, logo en contraste en el contrafuerte, plantilla de piel con logo, forro de satén y suela plana de goma. Este producto viene con su certificado de autenticidad. Este artículo viene con una bolsa de protección. Hecho en Italia.",
                  Composition= "Exterior= Piel de becerro 100%\nForro= Piel de becerro 100%, Otros tejidos 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Fendi",
                  Model= "Zapatillas Bajas Match Con Cordones",
                  Original_Price= 644,
                  Discount_Price= 644,
                  Stock= 12,
                  Img_Name= "Zapatillas Bajas Match Con Cordones.jpg",
                  Description= "Paneles con diseño colour block, parche del logo FF, logo en el contrafuerte, parche del logo en la lengüeta y cierre con cordones en la parte delantera. Hecho en Italia.",
                  Composition= "Exterior= Piel de becerro 100%, Ante de becerro 100%\nForro= Piel de becerro 100%, Otros tejidos 100%\nSuela= Goma 100%"
            }, 
            new Product 
            {
                  Id= 0,
                  Brand= "Off-White",
                  Model= "Zapatillas The Ball",
                  Original_Price= 750,
                  Discount_Price= 750,
                  Stock= 12,
                  Img_Name= "Zapatillas The Ball.jpg",
                  Description= "Las zapatillas The Ball son un modelo llamativo y moderno con un diseño futurista que destaca por su estructura robusta y suela voluminosa. Su estética audaz combina materiales de alta calidad, como cuero y malla, que proporcionan tanto durabilidad como ventilación. Con detalles geométricos y un acabado minimalista, estas zapatillas logran un equilibrio entre estilo urbano y comodidad. Los colores suelen ser monocromáticos o en tonos neutros, lo que las hace versátiles y fáciles de combinar. Ideales para quienes buscan un calzado distintivo y funcional para el día a día.",
                  Composition= "Exterior= Cuero 100%\nForro= poliéster 100%\nSuela= Goma 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Adidas",
                  Model= "Zapatillas Forum Low CL \"The Simpsons - Living Room\"",
                  Original_Price= 455,
                  Discount_Price= 455,
                  Stock= 12,
                  Img_Name= "Zapatillas Forum Low CL The Simpsons - Living Room.jpg",
                  Description= "La zapatilla Forum Low CL \"The Simpsons - Living Room\" es una edición especial inspirada en el icónico salón de la familia Simpson. Presenta una paleta de colores que refleja los tonos clásicos del sofá y la alfombra de la sala, con detalles en tonos marrones, anaranjados y azul pastel. El material incluye texturas y acabados que evocan la estética retro de la serie, mientras que algunos elementos gráficos rinden homenaje a detalles del hogar Simpson. El logo de adidas se combina con gráficos exclusivos de The Simpsons, logrando una apariencia nostálgica y divertida.",
                  Composition= "Exterior= terciopelo 100%\nSuela= Goma 100%\nForro= Otros tejidos 100%"
            },
            new Product
            {
                  Id= 0,
                  Brand= "Nike",
                  Model= "Zapatillas SB Dunk Low De Nike X Grateful Dead",
                  Original_Price= 1803,
                  Discount_Price= 1803,
                  Stock= 12,
                  Img_Name= "Zapatillas SB Dunk Low De Nike X Grateful Dead.jpg",
                  Description= "Parche del logo en la lengüeta, cierre con cordones en la parte delantera, detalle del logo Swoosh, puntera redonda y suela dentada de goma. Estos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.",
                  Composition= "Exterior= Cuero 100%, ante 100%, nylon 100%, poliéster 100%\nForro= poliéster 100%\nSuela= Goma 100%"
            }
};

        _context.Products.AddRange(products);
        _context.Users.AddRange(users);
        _context.SaveChanges();
    }
}
