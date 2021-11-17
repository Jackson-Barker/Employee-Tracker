INSERT INTO department (name)
VALUES ('Accounting'),
       ('Marketing'),
       ('HR'),
       ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('sales person', 60.00, 4),
       ('hr person', 55.00, 3),
       ('marketing director', 90.00, 2),
       ('accountant', 75.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Jane", "Doe", 2),
       ("Sam", "Adams", 3),
       ("Dan", "Smith", 4);

UPDATE employee SET manager_id =3 WHERE id=1;