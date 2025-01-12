from extensions.sql_alchemy import db
from flask import jsonify
import datetime


class User(db.Model):
    id: int = db.Column(db.Integer(), primary_key=True)
    name: str = db.Column(db.String(), nullable=False)
    npm: int = db.Column(db.Integer(), unique=False, nullable=False)
    email: str = db.Column(db.String(80), unique=True, nullable=False)
    role: int = db.Column(db.Integer(), nullable=False, default=1)
    lab: int = db.Column(db.Integer(), nullable=False, default=1)
    isAdmin: bool = db.Column(db.Boolean(), nullable=False, default=False)
    isDisabled: bool = db.Column(db.Boolean(), nullable=False, default=False)
    dateCreated: datetime.date = db.Column(
        db.Date(), nullable=False, default=datetime.datetime.now()
    )

    def __repr__(self) -> str:
        return f"<User {self.name} {self.npm}>"

    def create(self) -> None:
        db.session.add(self)
        db.session.commit()

    def read(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "npm": self.npm,
            "email": self.email,
            "role": self.role,
            "lab": self.lab,
            "isAdmin": self.isAdmin,
            "isDisabled": self.isDisabled,
            "dateCreated": self.dateCreated,
        }

    def update(
        self,
        name: str,
        npm: int,
        role: int,
        lab: int,
        isAdmin: bool,
        isDisabled: bool,
    ) -> None:
        self.name = name
        self.npm = npm
        self.role = role
        self.lab = lab
        self.isAdmin = isAdmin
        self.isDisabled = isDisabled
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()


class UserHistory(db.Model):
    id: int = db.Column(db.Integer(), primary_key=True)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))
    name: str = db.Column(db.String(), nullable=False)
    npm: int = db.Column(db.Integer(), nullable=False)
    dateHistory: datetime.date = db.Column(db.Date(), nullable=False)
    description: str = db.Column(db.String(), nullable=False)

    def __repr__(self) -> str:
        return f"<UserHistory {self.name} {self.userID}>"

    def create(self) -> None:
        db.session.add(self)
        db.session.commit()

    def read(self, id) -> dict:
        pass


class UserPreference(db.Model):
    id: int = db.Column(db.Integer(), primary_key=True)
    name: str = db.Column(db.String(), nullable=False)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))

    def __repr__(self) -> str:
        return f"<UserPreference {self.name} {self.userID}>"


class SoftwareConfiguration(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    softwareName: str = db.Column(db.String(), nullable=False)
    filepath: str = db.Column(db.String(), nullable=False)
    lab: str = db.Column(db.String(), nullable=False)

    def __repr__(self) -> str:
        return f"<SoftwareConfiguration {self.softwareName}>"


class RoleConfiguration(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    roleName: int = db.Column(db.Integer(), nullable=False)

    def __repr__(self) -> str:
        return f"<RoleConfiguration {self.roleName}>"


class SubmittedJob(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))
    jobName: str = db.Column(db.String(), nullable=False)
    submittedAt: datetime.date = db.Column(db.Date(), nullable=False)
    finishedAt: datetime.date = db.Column(db.Date(), nullable=True)
    jobSlurmID: int = db.Column(db.Integer(), nullable=False)
    state: str = db.Column(db.String(), nullable=False)

    def __repr__(self) -> str:
        return f"<SubmittedJob {self.jobName} {self.state}>"


# Reference Structure Database
class ReferenceStructure(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)

    def __repr__(self) -> str:
        return f"<ReferenceStructure {self.id}>"


class JobTemplate(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))

    def __repr__(self) -> str:
        return f"<JobTemplate {self.id}>"


class StudentGrade(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))

    def __repr__(self) -> str:
        return f"<StudentGrade {self.id}>"


class JobResultSummary(db.Model):
    id: int = db.Column(db.Integer(), nullable=False, primary_key=True)
    userID: int = db.Column(db.Integer(), db.ForeignKey(User.id))

    def __repr__(self) -> str:
        return f"<JobResultSummary {self.id}>"
