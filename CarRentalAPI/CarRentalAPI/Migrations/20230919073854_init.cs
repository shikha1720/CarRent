﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRentalAPI.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agreements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Totalprice = table.Column<int>(type: "int", nullable: false),
                    AgreementStatus = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agreements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Maker = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalPrice = table.Column<int>(type: "int", nullable: false),
                    About = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRented = table.Column<bool>(type: "bit", nullable: false),
                    AdminConfirm = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "About", "AdminConfirm", "ImageUrl", "IsRented", "Maker", "Model", "RentalPrice" },
                values: new object[,]
                {
                    { 1, "The Tata Tiago is a 5-door hatchback city car made by Tata Motors in India since 2016.Codenamed the Kite during development, the Tiago was previously announced as the Tata Zica, with Zica short for zippy car, but it was changed because the launch of the car coincided with the outbreak of Zika virus.[3] Tiago, a common Portuguese masculine name, was simultaneously picked from suggestions solicited online and from brand naming company Appella's fully validated shortlist of names, who were commissioned by Tata Motors to find an alternative name in February 2016.Since March 2017, a sedan derivative of the Tiago known as the Tigor has been produced.", false, "https://static.autox.com/uploads/2021/03/Tata-Tiago-BS6.jpg", false, "Tata", "Tiago", 3000 },
                    { 2, "The Nexon made its debut as a prototype exhibited at the Auto Expo 2014. The final model was presented in February 2016.The Nexon is based on the revised Tata X1 platform that debuted in 1998 with the Indica model and was adopted by other Indian brand cars. It uses an independent MacPherson dual-path strut with coil spring front suspensions and rear twist-beam with coil spring and shock absorber. The wheelbase is measured at 2,498 mm (98.3 in). It is characterized by two-tone paint (optional), dual halogen headlamps with projector low beams, and large chrome bands along the side.", false, "https://ic1.maxabout.us/autos/cars_india/N/2020/12/new-tata-nexon-suv.jpg", false, "Tata", "Nexon", 4000 },
                    { 3, "The Tata Altroz is a subcompact car/supermini manufactured by Tata Motors. The Altroz was revealed at the 89th Geneva International Motor Show alongside the new Buzzard, Buzzard Sport, and H2X compact SUV concept. It was launched to the Indian market on 22 January 2020. The name \"Altroz\" was inspired by name of bird species, Albatross.At present, the Altroz has three engines on offer, which are 1.2-litre three-cylinder petrol, 1.5-litre turbodiesel and a 1.2-litre three-cylinder turbocharged petrol. There is a 5-speed manual transmission on offer, with an optional wet-clutch DCT automatic known as Altroz DCA.\r\n\r\nAn electric version of the Altroz is expected to launch on sale around 2022.", false, "https://cdni.autocarindia.com/ExtraImages/20201107123449_Tata-Altroz-XM-plus.jpg", false, "Tata", "Altroz", 3500 },
                    { 4, "The first-generation Safari was presented in 1998 in India. The Tata range in the nineties saw the expansion into new markets with newer models such as the Indica city car and the Safari. Exports to Europe took place during the same year, with sales in the UK in 1999.The Safari is powered by the same engine used in the Tata Telcoline, a 2.0-litre Peugeot XD88 turbodiesel unit with 87 PS (64 kW) power. It came with a synchromesh forward five-speed manual gearbox, with a 4WD option and 235/75x15 tyres. Compared to the Indian model, the European Safari presented some changes in particular accessories to meet the needs of European customers, the bumpers were different in colour compared to the rest of the bodywork. The name Safari was adopted to emphasize the supposed off-road qualities of the vehicle. In reality, the car was also designed for road use. The Safari is 4.65 meters long from one bumper to the other but the presence of the outer spare wheel increases the size up to 4.81 meters. The weighs of the vehicle is 1,920 kg (4,230 lb) kerb for the 2WD version, adding an extra 110 kg (240 lb) for the 4WD variant.", false, "https://techvorm.com/wp-content/uploads/2021/01/Safari-Image-2-scaled.jpg", false, "Tata", "Safari", 4000 },
                    { 5, "In 1982, Suzuki of Japan and Maruti Udyog Ltd. signed a license and joint venture agreement (JVA). Initially, Maruti Suzuki was primarily an automobile importer. Maruti was granted permission to import two Suzuki vehicles that were completely assembled in the first two years of India's closed market, with an initial target of using just 33% domestic components. This greatly displeased the nearby manufacturers. There were some worries that the Indian market wouldn't support Maruti Suzuki's relatively high production levels, and the government even considered changing the petrol tariff and decreasing the excise fee to increase sales. Local production commenced in December 1983 with the introduction of the SS30/SS40 Suzuki Fronte/Alto-based Maruti 800. In 1984, the Maruti Van with the same three-cylinder engine as the 800 was released and the installed capacity of the plant in Gurgaon reached 40,000 units.", false, "https://data1.ibtimes.co.in/en/full/677281/new-maruti-suzuki-swift.jpg", false, "Maruti", "Suzuki", 4500 },
                    { 6, "The Suzuki Baleno nameplate has been used by the Japanese manufacturer Suzuki to denote several different subcompact cars since 1996.\r\n\r\nFrom 1996 to 2002, the Suzuki Baleno that was sold in Europe and Asia-Pacific was a rebadged Suzuki Cultus Crescent. It was also produced and sold in India as the Maruti Suzuki Baleno until 2007.After the introduction of the Suzuki Aerio in 2001, the Baleno nameplate was discontinued in Europe and Asia Pacific, and remained in use only in Indonesia. This Baleno was a rebadged Suzuki Aerio sedan, marketed as the Suzuki Baleno Next-G, sold from 2003 to 2007.From 2008 to 2010, the Indonesian market received a rebadged Suzuki SX4 sedan, marketed as the Suzuki Neo Baleno.\r\nSuzuki Baleno – A five-door hatchback automobile introduced in 2015. ", false, "https://img.indianauto.com/2021/02/23/FJZsdGEY/maruti-suzuki-baleno-3cde_wm.jpg", false, "Maruti", "Baleno", 3000 },
                    { 7, "Named after the Thar Desert, the Mahindra Thar was first introduced in 2010 as a modernized version of the Mahindra Legend, which was based on the Mahindra MM540, a vehicle that was in production in India since the 1980s.The Thar was designed to be a rugged, reliable, and affordable off-road vehicle that could handle the rough terrain found in many parts of India. Its design is based on the iconic Jeep CJ series, which Mahindra had been producing under license since the 1940s.The first generation Mahindra Thar was powered by a 2.5-liter turbocharged diesel engine that produced 105 horsepower and 247 Nm of torque. The vehicle was available in two trim levels: the DI 2WD and the DI 4WD. The DI 2WD was a basic version that came with a soft top and no air conditioning, while the DI 4WD came with air conditioning and a hardtop. In 2015, Mahindra introduced an updated version of the Thar called the Thar CRDe. The CRDe stood for \"common rail diesel engine,\" which was a more advanced engine that produced 105 horsepower and 247 Nm of torque. The Thar CRDe also had updated safety features, such as airbags and ABS, and was available in two trim levels: the CRDe 4WD and the CRDe 4WD AC.", false, "https://img.indianautosblog.com/2021/01/22/2020-mahindra-thar-front-3-quarters-620c.jpg", false, "Mahindra", "Thar", 3800 },
                    { 8, "The Hyundai Creta, also known as Hyundai ix25 in China, is a subcompact crossover SUV produced by Hyundai since 2014 mainly for emerging markets, particularly BRICS. It is positioned above the Venue and below the Tucson in Hyundai's SUV line-up.\r\n\r\nThe first-generation model debuted as a near-production concept car in China in April 2014, while the second generation was first introduced in 2019. The second-generation model was also available in a longer derivative with three-row seating, which is known as the Hyundai Alcazar, Creta Grand or Grand Creta. The vehicle has been manufactured in China, India, Russia, Brazil, and Indonesia. For developed markets like South Korea, the United States, Canada, EU/EFTA/EEA countries (with the exception of the French overseas collectivities of French Polynesia[1] and New Caledonia[2]) and Australia, the Creta is not offered in favour of the smaller but more advanced Kona.", false, "https://img-ik.cars.co.za/images/2017/2/HyundaiCreta/tr:n-news_1200x/creta5.jpg", false, "Hyundai", "Creta", 3900 },
                    { 9, "The Maruti Suzuki Alto is a city car manufactured and marketed by Suzuki through its subsidiary Maruti Suzuki primarily for the Indian market since 2000. The first-generation model was essentially the Indian version of the fifth-generation Suzuki Alto kei car (with larger engine options). The second generation was made as a standalone model, which was built on the same platform as the first generation. The third-generation model is built on the same underpinnings as the S-Presso.  Since 2006, the Alto has been India's best-selling car and crossed the 1 million production figure in February 2008 becoming the third Maruti model to cross the million mark in India after Maruti 800 and Maruti Omni and fourth overall joining Hyundai Santro.", false, "https://befirstrank.com/wp-content/uploads/2016/02/Maruti-Suzuki-Alto-800-Front-view-67071.jpg", false, "Maruti", "Alto 800", 3200 }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Password", "Role", "Token", "Username" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "Admin", "", "Admin@123", "Admin", "", "admin" },
                    { 2, "shikhajain@gmail.com", "Shikha", "Jain", "Shikha@123", "user", "", "shikha01" },
                    { 3, "surabhijain@gmail.com", "Surabhi", "Jain", "Surabhi@123", "user", "", "surabhi02" },
                    { 4, "stutijain@gmail.com", "Stuti", "Jain", "Stuti@123", "user", "", "stuti03" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agreements");

            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}