// Shared
import { SidebarService } from './shared/sidebar.service';
// Settings
import { SettingsService } from './settings/settings.service';
// Guards
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { VerifyTokenGuard } from './guards/verify-token.guard';
// ModalUpload
import { ModalUploadService } from './modal-upload/modal-upload.service';
// UploadFile
import { UploadFileService } from './uploadFile/uploadFile.service';
// Users - Doctors - Hospital
import { DoctorService } from './doctor/doctor.service';
import { HospitalService } from './hospital/hospital.service';
import { UserService } from './user/user.service';
// Search
import { SearchService } from './search/search.service';



export {
    SidebarService,
    SettingsService,
    LoginGuard,
    AdminGuard,
    VerifyTokenGuard,
    ModalUploadService,
    UploadFileService,
    UserService,
    HospitalService,
    DoctorService,
    SearchService,
};
