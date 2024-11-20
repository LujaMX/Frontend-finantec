import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'
import fondform from './fondform.png'

export const assets = {
    fondform,
    logo,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Ahorro",
        menu_image: menu_2
    },
    {
        menu_name: "Inversion",
        menu_image: menu_3
    },
    {
        menu_name: "Contabilidad",
        menu_image: menu_4
    },
    {
        menu_name: "Gastos",
        menu_image: menu_5
    },
    {
        menu_name: "Analisis",
        menu_image: menu_8
    }]

export const food_list = [
    {
        image: food_1,
        description: "FinanTec ofrece plantillas personalizadas para crear presupuestos adaptados a las necesidades del usuario. Facilita la proyección de presupuestos futuros y la gestión de cobros, asegurando un flujo de caja saludable. Permite ajustes flexibles y proporciona análisis detallados para mejorar la planificación financiera. Su interfaz intuitiva y herramientas de visualización hacen que la gestión del presupuesto sea sencilla y eficiente. Con FinanTec, los usuarios pueden crear y mantener presupuestos efectivos para una mejor salud financiera.",
        category: "Presupuesto"
    },
    {
        image: food_2,
        description: "FinanTec permite ahorrar de manera fácil y efectiva, ofreciendo planes de ahorro personalizados según tus objetivos. Puedes seleccionar la cantidad que deseas comenzar a ahorrar y ajustar tus metas en cualquier momento. La aplicación te ayuda a automatizar ahorros recurrentes y proporciona análisis detallados para optimizar tus estrategias de ahorro. Su interfaz intuitiva y herramientas de seguimiento te mantienen enfocado en tus objetivos financieros. Con FinanTec, ahorrar se convierte en una tarea sencilla y alcanzable.",
        category: "Ahorro",
        templateDownload: true // Agregar esta propiedad para indicar que se debe mostrar el botón de descarga
    }, {
        image: food_3,
        description: "FinanTec ofrece herramientas para generar listas de las mejores opciones de inversión y plantillas personalizadas para crear estrategias de inversión. Permite calcular las ganancias proyectadas y comparar diferentes escenarios de inversión. Proporciona análisis detallados y reportes para optimizar las decisiones de inversión. Su interfaz intuitiva y visualizaciones claras facilitan la comprensión y el seguimiento de las inversiones. Con FinanTec, los usuarios pueden planificar y gestionar sus inversiones de manera efectiva para maximizar sus rendimientos.",
        category: "Inversion"
    }, {
        image: food_4,
        description: "FinanTec brinda herramientas para generar listas de las mejores prácticas contables y plantillas personalizadas para diversas necesidades contables. Permite calcular ingresos, gastos y balances financieros de manera eficiente. Facilita la gestión de cuentas por cobrar y por pagar, así como el seguimiento de activos y pasivos. Proporciona análisis detallados y reportes para optimizar la contabilidad y cumplir con las normativas.",
        category: "Contabilidad"
    }, {
        image: food_5,
        description: "Con FinanTec, puedes identificar y reducir gastos innecesarios mediante análisis detallados de tus hábitos de gasto. La aplicación ofrece herramientas para crear presupuestos personalizados y establecer límites claros para cada categoría de gastos, ayudando a evitar los gastos hormiga. Además, proporciona alertas y recordatorios para evitar pagos tardíos o excesivos. Su interfaz intuitiva y visualizaciones claras te permiten comprender fácilmente tus patrones de gasto y tomar decisiones informadas para optimizar tu presupuesto.",
        category: "Gastos"
    }, {
        image: food_6,
        description: "FinanTec ofrece herramientas para maximizar la gestión de recursos y sobrevivir con lo disponible. Genera listas de recursos disponibles y brinda plantillas para aprovecharlos al máximo. Calcula opciones para optimizar el uso de recursos extras y proyectar su impacto en la supervivencia a largo plazo. Proporciona análisis detallados y estrategias adaptativas para enfrentar situaciones cambiantes.",
        category: "Recursos"
    }, {
        image: food_7,
        description: "FinanTec ofrece herramientas para calcular impuestos de manera precisa y personalizada, simplificando el proceso para los usuarios. Proporciona plantillas y guías para ayudar en la organización de documentos fiscales y la preparación de declaraciones. Permite estimar los impuestos a pagar y ofrece consejos para optimizar deducciones y créditos fiscales. Además, brinda alertas y recordatorios para fechas límite fiscales importantes.",
        category: "Impuestos"
    }, {
        image: food_8,
        description: "FinanTec ofrece herramientas para realizar análisis financieros detallados, proporcionando orientación sobre cómo llevarlos a cabo y mejorar su precisión. Ofrece plantillas personalizadas y guías para estructurar análisis de manera efectiva. Permite la integración de datos externos para enriquecer el análisis y mejorar su calidad. Proporciona herramientas de visualización y comparación para identificar tendencias y patrones importantes.",
        category: "Analisis"
    }
]
