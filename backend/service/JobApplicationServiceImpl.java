package com.tka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.dao.JobApplicationDaoImpl;
import com.tka.dao.JobPostingDaoImpl;
import com.tka.dao.StudentDaoImpl;
import com.tka.entity.JobApplication;
import com.tka.entity.JobPosting;
import com.tka.entity.Student;
import com.tka.enums.ApplicationStatus;
import java.util.List;

@Service
public class JobApplicationServiceImpl {

    @Autowired
    private JobApplicationDaoImpl jobApplicationDao;

    @Autowired
    private StudentDaoImpl studentDao;

    @Autowired
    private JobPostingDaoImpl jobPostingDao;

    // Apply for a job
    public void applyForJob(JobApplication jobApplication) {

        // 1️⃣ Set default status
        jobApplication.setStatus(ApplicationStatus.APPLIED);

        // 2️⃣ Fetch student name
        Student student = studentDao.getStudentById(jobApplication.getStudentId());
        jobApplication.setStudentName(student.getName());

        // 3️⃣ Fetch company name
        JobPosting job = jobPostingDao.getJobPostingById(jobApplication.getJobPostingId());
        jobApplication.setCompanyName(job.getCompanyName());

        // 4️⃣ Save
        jobApplicationDao.applyForJob(jobApplication);
    }

    public void updateApplicationStatus(Long id, String status) {
        jobApplicationDao.updateApplicationStatus(id, status);
    }

    public List<JobApplication> getAllApplications() {
        return jobApplicationDao.getAllApplications();
    }

    public JobApplication getApplicationById(Long id) {
        return jobApplicationDao.getApplicationById(id);
    }

    public String deleteApplication(Long id) {
        return jobApplicationDao.deleteApplication(id);
    }
    
    public List<JobApplication> getApplicationsByStudentId(Long studentId) {
        return jobApplicationDao.getApplicationsByStudentId(studentId);
    }

}
