using System;
using AutoMapper;
using PLIMS.Common;
using PLIMS.DataAccess.DTO;
using PLIMS.DataAccess.Entities;
using PLIMS.Models.ViewModels;
using PLIMS.Models.ViewModels.Charts;
using PLIMS.Models.ViewModels.ChemicalAnalysis;
using PLIMS.Models.ViewModels.GasCondensateContentWmr;

namespace PLIMS.Business.Mapper
{
    public class EntityToVMProfile : Profile
    {
        public EntityToVMProfile()
        {
            MapPlaces();
            MapPoints();
            MapUsers();
            MapChemicalAnalysis();
            MapGasCondensateContentWmr();
        }

        private void MapPlaces()
        {
            CreateMap<SamplingPlacesEntity, SamplingPlaceViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Name));

            CreateMap<SamplingPlacesEntity, ChemicalAnalysisTreeItem>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Name))
                .ForMember(vm => vm.Type, opt => opt.MapFrom(ent => ChemicalAnalysisTreeItemType.Place));
        }

        private void MapPoints()
        {
            CreateMap<SamplingPointDTO, SamplingPointViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Name));

            CreateMap<SamplingPointDTO, ChemicalAnalysisTreeItem>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Name))
                .ForMember(vm => vm.Type, opt => opt.MapFrom(ent => ChemicalAnalysisTreeItemType.Point));

            CreateMap<PointEntity, SamplingPointFullViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Name))
                .ForMember(vm => vm.PlaceId, opt => opt.MapFrom(ent => ent.PlaceId));
        }

        private void MapUsers()
        {
            CreateMap<UserEntity, UserShortInfoViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.FullName,
                    opt => opt.MapFrom(ent => StringUtils.GetFullName(ent.FirstName, ent.LastName, ent.Patronymic)));

            CreateMap<UserEntity, UserViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.FirstName, opt => opt.MapFrom(ent => ent.FirstName))
                .ForMember(vm => vm.LastName, opt => opt.MapFrom(ent => ent.LastName))
                .ForMember(vm => vm.Patronymic, opt => opt.MapFrom(ent => ent.Patronymic));
        }

        private void MapChemicalAnalysis()
        {
            CreateMap<ChemicalAnalysisDTO, ChemicalAnalysisGridViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.RegCode, opt => opt.MapFrom(ent => ent.RegCode))
                .ForMember(vm => vm.AnalysisDate, opt => opt.MapFrom(ent => ent.AnalysisDate.GetValueOrDefault()))
                .ForMember(vm => vm.DeliveringDate, opt => opt.MapFrom(ent => ent.DeliveringDate.GetValueOrDefault()))
                .ForMember(vm => vm.SamplingDate, opt => opt.MapFrom(ent => ent.SamplingDate.GetValueOrDefault()))
                .ForMember(vm => vm.SamplingPlace, opt => opt.MapFrom(ent => ent.PlaceName))
                .ForMember(vm => vm.SamplingPoint, opt => opt.MapFrom(ent => ent.PointName))
                .ForMember(vm => vm.LaboratoryAssistant, opt => opt.MapFrom(ent => ent.UserName));

            CreateMap<ChemicalAnalysisEditDTO, ChemicalAnalysisViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.RegCode, opt => opt.MapFrom(ent => ent.RegCode))
                .ForMember(vm => vm.AnalysisDate, opt => opt.MapFrom(ent => ent.AnalysisDate))
                .ForMember(vm => vm.DeliveringDate, opt => opt.MapFrom(ent => ent.DeliveringDate))
                .ForMember(vm => vm.SamplingDate, opt => opt.MapFrom(ent => ent.SamplingDate))
                .ForMember(vm => vm.CondensateContent, opt => opt.MapFrom(ent => ent.CondensateContent))
                .ForMember(vm => vm.WMRContent, opt => opt.MapFrom(ent => ent.WmrContent))
                .ForMember(vm => vm.MassFractionOfWater, opt => opt.MapFrom(ent => ent.MassFractionOfWater))
                .ForMember(vm => vm.MassFractionOfWaterError, opt => opt.MapFrom(ent => ent.MassFractionOfWaterError))
                .ForMember(vm => vm.MassFractionOfWaterNotAvailable,
                    opt => opt.MapFrom(ent => ent.MassFractionOfWaterNotAvailable))
                .ForMember(vm => vm.MassFractionOfMethanol, opt => opt.MapFrom(ent => ent.MassFractionOfMethanol))
                .ForMember(vm => vm.MassFractionOfMethanolError,
                    opt => opt.MapFrom(ent => ent.MassFractionOfMethanolError))
                .ForMember(vm => vm.MassFractionOfMethanolNotAvailable,
                    opt => opt.MapFrom(ent => ent.MassFractionOfMethanolNotAvailable))
                .ForMember(vm => vm.MassConcentrationOfCorrosionInhibitor,
                    opt => opt.MapFrom(ent => ent.MassConcentrationOfCorrosionInhibitor))
                .ForMember(vm => vm.MassConcentrationOfCorrosionInhibitorNotAvailable,
                    opt => opt.MapFrom(ent => ent.MassConcentrationOfCorrosionInhibitorNotAvailable))
                .ForMember(vm => vm.Place,
                    opt => opt.MapFrom(ent => new SamplingPlaceViewModel {Id = ent.Place.Id, Name = ent.Place.Name}))
                .ForMember(vm => vm.Point,
                    opt => opt.MapFrom(ent => new SamplingPointViewModel {Id = ent.Point.Id, Name = ent.Point.Name}))
                .ForMember(vm => vm.User,
                    opt => opt.MapFrom(ent => new UserShortInfoViewModel {Id = ent.User.Id, FullName = ent.User.Name}));
        }

        private void MapGasCondensateContentWmr()
        {
            CreateMap<GasCondensateContentWmrDTO, GasCondensateContentWmrTableViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.RegCode, opt => opt.MapFrom(ent => ent.RegCode))
                .ForMember(vm => vm.SamplingDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.SamplingDate)))
                .ForMember(vm => vm.DeliveringDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.DeliveringDate)))
                .ForMember(vm => vm.AnalysisDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.AnalysisDate)))
                .ForMember(vm => vm.SamplingPlace, opt => opt.MapFrom(ent => ent.PlaceName))
                .ForMember(vm => vm.WmrContent, opt => opt.MapFrom(ent => ent.WmrContent))
                .ForMember(vm => vm.LaboratoryAssistant, opt => opt.MapFrom(ent => ent.UserName));

            CreateMap<GasCondensateContentWmrEditDTO, GasCondensateContentWmrViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Id))
                .ForMember(vm => vm.RegCode, opt => opt.MapFrom(ent => ent.RegCode))
                .ForMember(vm => vm.SamplingDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.SamplingDate)))
                .ForMember(vm => vm.DeliveringDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.DeliveringDate)))
                .ForMember(vm => vm.AnalysisDate, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.AnalysisDate)))
                .ForMember(vm => vm.WmrContent, opt => opt.MapFrom(ent => ent.WmrContent))
                .ForMember(vm => vm.Place,
                    opt => opt.MapFrom(ent => new SamplingPlaceViewModel {Id = ent.Place.Id, Name = ent.Place.Name}))
                .ForMember(vm => vm.Point,
                    opt => opt.MapFrom(ent => new SamplingPointViewModel {Id = ent.Point.Id, Name = ent.Point.Name}))
                .ForMember(vm => vm.User,
                    opt => opt.MapFrom(ent => new UserShortInfoViewModel {Id = ent.User.Id, FullName = ent.User.Name}));
            CreateMap<GasCondensateContentWmrChartDTO, SamplingPointViewModel>()
                .ForMember(vm => vm.Id, opt => opt.MapFrom(ent => ent.Point.Id))
                .ForMember(vm => vm.Name, opt => opt.MapFrom(ent => ent.Point.Name));

            CreateMap<GasCondensateContentWmrChartDTO, PointViewModel>()
                .ForMember(vm => vm.Date, opt => opt.MapFrom(ent => DateUtils.ConvertToCurrentTimeZone(ent.SamplingDate)))
                .ForMember(vm => vm.Value, opt => opt.MapFrom(ent => ent.WmrContent));
        }
    }
}