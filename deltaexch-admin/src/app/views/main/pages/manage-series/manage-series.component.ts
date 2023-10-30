import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-manage-series',
  templateUrl: './manage-series.component.html',
  styleUrls: ['./manage-series.component.css']
})
export class ManageSeriesComponent implements OnInit {
  selectedIndex: number = 0;

  setIndex(index: number) {
     this.selectedIndex = index;
  }
  constructor(private service: MatchService
    , private toaster: ToastrService) { }
  hideme: any = [];
  sportId: any;
  sportName: any;
  sportList: any = [];
  cheked: any
  seriesList: any = [];
  isExpend: any;
  isExpendsession:any;
  hideme1:any=[];
  isExpend1:any;
  matchList:any = [];
  ngOnInit(): void {
    this.getSportList();
  }

  /**
   * for getting list of the sports
   */
  getSportList() {
    let payload = {
      is_active: "1"
    }
    this.service.getSportList(payload).subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
        this.sportId = this.sportList[0].sport_id;
        this.sportName = this.sportList[0].name;
        this.getSeriesList(this.sportId, this.sportName);
      }
      else {
        this.toaster.error(res?.message)
      }
    })

  }

  /**
   * For getting series list of the specific sport id
   * @param sportid :sport id for particular match
   */
  getSeriesList(sportid, name) {
    this.sportName = name;
    this.sportId = sportid
    let payload = {
      sport_id: sportid
    }
    this.service.getSeriesList(payload).subscribe((res) => {
      if (res.status) {
        this.seriesList = res.data;
      } else {
        this.toaster.error(res?.message)
      }
    })

  }

  /**
   * this method is used for saving the series
   */
  SaveSeries(series) {
    let payload = {
      series_id: series.series_id,
      sport_id: series.sport_id,
      name: series.series_name
    }
    this.service.createSeries(payload).subscribe((res) => {
      if (res.status) {
        this.toaster.success(res?.message)
        this.getSeriesList(this.sportId, this.sportName)
      } else {
        this.toaster.error(res?.message);
      }
    })
  }

  ngAfterViewInit() {


  }
  /**
   * This method is used for getting all online matchs of particular series id
   * @param series - series is containging sport_id and series_id
   */
  getMatchList(series) {
    let payload = {
      series_id: series.series_id,
      sport_id: series.sport_id
    }
    this.service.getMatchList(payload).subscribe((res) => {
      if (res.status) {
         this.matchList = res.data;
      } else {
        this.toaster.error(res?.message);
      }
    })
  }

}
