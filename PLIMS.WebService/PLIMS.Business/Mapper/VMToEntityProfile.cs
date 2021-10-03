using AutoMapper;
using PLIMS.Common;
using PLIMS.DataAccess.Entities;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.ChemicalAnalysis;
using PLIMS.Models.ViewModels.GasCondensateContentWmr;

namespace PLIMS.Business.Mapper
{
    public class VMToEntityProfile : Profile
    {
        public VMToEntityProfile()
        {
            MapChemicalAnalysis();
            MapUser();
            MapPlaces();
            MapPoints();
            MapGasCondensateContentWmr();
        }

        private void MapChemicalAnalysis()
        {
            CreateMap<ChemicalAnalysisViewModel, ChemicalAnalysisEntity>()
                .ForMember(ent => ent.Id, opt => opt.MapFrom(vm => vm.Id))
                .ForMember(ent => ent.RegCode, opt => opt.MapFrom(vm => vm.RegCode))
                .ForMember(ent => ent.AnalysisDate, opt => opt.MapFrom(vm => vm.AnalysisDate))
                .ForMember(ent => ent.DeliveringDate, opt => opt.MapFrom(vm => vm.DeliveringDate))
                .ForMember(ent => ent.SamplingDate, opt => opt.MapFrom(vm => vm.SamplingDate))
                .ForMember(ent => ent.CondensateContent, opt => opt.MapFrom(vm => vm.CondensateContent))
                .ForMember(ent => ent.WmrContent, opt => opt.MapFrom(vm => vm.WMRContent))
                .ForMember(ent => ent.MassFractionOfMethanolError,
                    opt => opt.MapFrom(vm => vm.MassFractionOfMethanolError))
                .ForMember(ent => ent.MassFractionOfMethanol, opt => opt.MapFrom(vm => vm.MassFractionOfMethanol))
                .ForMember(ent => ent.MassFractionOfMethanolNotAvailable,
                    opt => opt.MapFrom(vm => vm.MassFractionOfMethanolNotAvailable))
                .ForMember(ent => ent.MassFractionOfWaterNotAvailable,
                    opt => opt.MapFrom(vm => vm.MassFractionOfWaterNotAvailable))
                .ForMember(ent => ent.MassFractionOfWater, opt => opt.MapFrom(vm => vm.MassFractionOfWater))
                .ForMember(ent => ent.MassFractionOfWaterError, opt => opt.MapFrom(vm => vm.MassFractionOfWaterError))
                .ForMember(ent => ent.MassConcentrationOfCorrosionInhibitorNotAvailable,
                    opt => opt.MapFrom(vm => vm.MassConcentrationOfCorrosionInhibitorNotAvailable))
                .ForMember(ent => ent.MassConcentrationOfCorrosionInhibitor,
                    opt => opt.MapFrom(vm => vm.MassConcentrationOfCorrosionInhibitor))
                .ForMember(ent => ent.UserId, opt => opt.MapFrom(vm => vm.User.Id))
                .ForMember(ent => ent.PointId, opt => opt.MapFrom(vm => vm.Point.Id));
        }

        private void MapGasCondensateContentWmr()
        {
            CreateMap<GasCondensateContentWmrViewModel, GasCondensateContentWmrEntity>()
                .ForMember(ent => ent.Id, opt => opt.MapFrom(vm => vm.Id))
                .ForMember(ent => ent.RegCode, opt => opt.MapFrom(vm => vm.RegCode))
                .ForMember(ent => ent.SamplingDate, opt => opt.MapFrom(vm => DateUtils.ConvertToUtc(vm.SamplingDate)))
                .ForMember(ent => ent.DeliveringDate, opt => opt.MapFrom(vm => DateUtils.ConvertToUtc(vm.DeliveringDate)))
                .ForMember(ent => ent.AnalysisDate, opt => opt.MapFrom(vm => DateUtils.ConvertToUtc(vm.AnalysisDate)))
                .ForMember(ent => ent.WmrContent, opt => opt.MapFrom(vm => vm.WmrContent))
                .ForMember(ent => ent.PointId, opt => opt.MapFrom(vm => vm.Point.Id))
                .ForMember(ent => ent.UserId, opt => opt.MapFrom(vm => vm.User.Id));
        }

        private void MapUser()
        {
            CreateMap<UserViewModel, UserEntity>()
                .ForMember(ent => ent.Id, opt => opt.MapFrom(vm => vm.Id))
                .ForMember(ent => ent.FirstName, opt => opt.MapFrom(vm => vm.FirstName))
                .ForMember(ent => ent.LastName, opt => opt.MapFrom(vm => vm.LastName))
                .ForMember(ent => ent.Patronymic, opt => opt.MapFrom(vm => vm.Patronymic));
        }

        private void MapPlaces()
        {
            CreateMap<SamplingPlaceViewModel, SamplingPlacesEntity>()
                .ForMember(ent => ent.Id, opt => opt.MapFrom(vm => vm.Id))
                .ForMember(ent => ent.Name, opt => opt.MapFrom(vm => vm.Name));
        }

        private void MapPoints()
        {
            CreateMap<SamplingPointFullViewModel, PointEntity>()
                .ForMember(ent => ent.Id, opt => opt.MapFrom(vm => vm.Id))
                .ForMember(ent => ent.Name, opt => opt.MapFrom(vm => vm.Name))
                .ForMember(ent => ent.PlaceId, opt => opt.MapFrom(vm => vm.PlaceId));
        }
    }
}