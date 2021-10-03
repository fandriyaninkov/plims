using System;

namespace PLIMS.Models.ViewModels.ChemicalAnalysis
{
    public class ChemicalAnalysisViewModel
    {
        public int? Id { get; set; }
        
        /// <summary>
        /// Регистрациооный номер.
        /// </summary>
        public string RegCode { get; set; }
        
        /// <summary>
        /// Дата отбора пробы.
        /// </summary>
        public DateTime? SamplingDate { get; set; }
        
        /// <summary>
        /// Дата доставки.
        /// </summary>
        public DateTime? DeliveringDate { get; set; }
        
        /// <summary>
        /// Дата анализа
        /// </summary>
        public DateTime? AnalysisDate { get; set; }
        
        /// <summary>
        /// Содержание ВМР
        /// </summary>
        public int WMRContent { get; set; }
        
        /// <summary>
        /// Содержание конденсата
        /// </summary>
        public int CondensateContent { get; set; }

        #region Массовая доля метанола в ВМР

        /// <summary>
        /// Массовая доля метанола в ВМР
        /// </summary>
        public double? MassFractionOfMethanol { get; set; }
        
        /// <summary>
        /// Погрешность массовой доли метанола в ВМР
        /// </summary>
        public double? MassFractionOfMethanolError { get; set; }
        
        /// <summary>
        /// Измерение показателя массовой доли метанола в ВМР не предусмотрено
        /// </summary>
        public bool MassFractionOfMethanolNotAvailable { get; set; }

        #endregion

        #region Массовая доля воды

        /// <summary>
        /// Массовая доля воды
        /// </summary>
        public double? MassFractionOfWater { get; set; }
        
        /// <summary>
        /// Ошибка массовой доли воды
        /// </summary>
        public double? MassFractionOfWaterError { get; set; }
        
        /// <summary>
        /// Измерение показателя массовой доли воды не предусмотрено
        /// </summary>
        public bool MassFractionOfWaterNotAvailable { get; set; }

        #endregion
        
        #region Массовая концентрация ингибитора коррозии

        /// <summary>
        /// Массовая концентрация ингибитора коррозии
        /// </summary>
        public int? MassConcentrationOfCorrosionInhibitor { get; set; }
        
        /// <summary>
        /// Погрешность измерения массовой концентрации ингибитора коррозии
        /// </summary>
        public bool MassConcentrationOfCorrosionInhibitorNotAvailable { get; set; }

        #endregion

        /// <summary>
        /// Место отбора.
        /// </summary>
        public SamplingPlaceViewModel Place { get; set; }
        
        /// <summary>
        /// Точка отбора
        /// </summary>
        public SamplingPointViewModel Point { get; set; }
        
        /// <summary>
        /// Лаборант
        /// </summary>
        public UserShortInfoViewModel User { get; set; }
    }
}